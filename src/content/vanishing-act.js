// One live camera feed going through Snap Vanish.
//
// States:  present → dissolving → gone → reforming → present
//
// Each frame: read the camera, track hands (snap detection), segment the
// person, keep the room memory up to date, then paint the output canvas the
// meeting app is streaming.
import { loadVisionModels } from './vision-models.js';
import { SnapGesture } from './snap-gesture.js';
import { EmptyRoom, ROOM_W } from './empty-room.js';
import { DustStorm } from './dust-storm.js';

const MASK_W = 160; // working resolution for silhouette maths
const COOLDOWN_MS = 1600;

const makeCanvas = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

export class VanishingAct {
  constructor({ track, output, prefs, ear, mic, onChange }) {
    this.track = track;
    this.output = output;
    this.outCtx = output.getContext('2d', { alpha: false });
    this.prefs = prefs;
    this.ear = ear;
    this.mic = mic;
    this.onChange = onChange;

    this.state = 'present';
    this.models = null;
    this.modelError = null;
    this.gesture = new SnapGesture();
    this.gesture.setSensitivity(prefs.sensitivity);
    this.pendingSnapAt = 0;
    this.lastToggle = 0;
    this.frameNo = 0;
    this.closed = false;

    loadVisionModels()
      .then((m) => (this.models = m))
      .catch((err) => {
        this.modelError = err;
        console.error('[Snap Vanish] could not load vision models', err);
      });

    this.run();
  }

  setPrefs(prefs) {
    this.prefs = prefs;
    this.gesture.setSensitivity(prefs.sensitivity);
  }

  // ---------------------------------------------------------------- frames

  async run() {
    if ('MediaStreamTrackProcessor' in window) {
      const reader = new MediaStreamTrackProcessor({ track: this.track }).readable.getReader();
      while (!this.closed) {
        const { value: frame, done } = await reader.read().catch(() => ({ done: true }));
        if (done) break;
        try {
          this.tick(frame, frame.displayWidth, frame.displayHeight);
        } catch (err) {
          console.error('[Snap Vanish] frame error', err);
        } finally {
          frame.close();
        }
      }
    } else {
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.srcObject = new MediaStream([this.track]);
      await video.play().catch(() => {});
      const step = () => {
        if (this.closed || this.track.readyState === 'ended') return this.close();
        if (video.videoWidth) this.tick(video, video.videoWidth, video.videoHeight);
        video.requestVideoFrameCallback(step);
      };
      video.requestVideoFrameCallback(step);
    }
    this.close();
  }

  ensureBuffers(w, h) {
    if (this.frameW === w && this.frameH === h) return;
    this.frameW = w;
    this.frameH = h;
    this.output.width = w;
    this.output.height = h;
    const rh = Math.round((ROOM_W * h) / w);
    this.work = makeCanvas(ROOM_W, rh);
    this.workCtx = this.work.getContext('2d', { willReadFrequently: true });
    const mh = Math.round((MASK_W * h) / w);
    this.maskW = MASK_W;
    this.maskH = mh;
    this.coverage = new Uint8ClampedArray(MASK_W * mh); // raw person mask
    this.grown = new Uint8ClampedArray(MASK_W * mh); // dilated
    this.maskImg = new ImageData(MASK_W, mh);
    this.maskSmall = makeCanvas(MASK_W, mh);
    this.softMask = makeCanvas(ROOM_W, rh); // feathered, room resolution
    this.softCtx = this.softMask.getContext('2d');
    this.patch = makeCanvas(ROOM_W, rh);
    this.patchCtx = this.patch.getContext('2d');
    this.dustLayer = makeCanvas(ROOM_W, rh);
    this.dustCtx = this.dustLayer.getContext('2d');
    this.room = new EmptyRoom(ROOM_W, rh);
    this.haveMask = false;
  }

  tick(source, w, h) {
    if (!w || !h) return;
    this.ensureBuffers(w, h);
    const now = performance.now();
    this.frameNo++;
    this.workCtx.drawImage(source, 0, 0, this.work.width, this.work.height);

    const busy = this.state !== 'present';
    if (this.models) {
      this.watchHands(now);
      // Segment every frame while the effect is on, every other frame otherwise.
      if (busy || this.frameNo % 2 === 0) this.segment(now);
      if (this.haveMask && this.frameNo % 3 === 0) {
        this.room.learn(this.work, this.softMask);
        if (!busy) this.room.askAi();
      }
    }
    this.paint(source, now);
  }

  watchHands(now) {
    const res = this.models.hands.detectForVideo(this.work, now);
    const hands = (res.landmarks || []).map((landmarks, i) => ({
      landmarks,
      handedness: res.handedness?.[i]?.[0]?.categoryName || String(i),
    }));
    const aspect = this.work.width / this.work.height;
    if (this.gesture.update(hands, now, aspect)) this.pendingSnapAt = now;

    if (this.pendingSnapAt) {
      const needSound = this.prefs.confirmWithSound && this.ear.listening;
      if (!needSound || this.ear.heardClickNear(this.pendingSnapAt)) {
        this.pendingSnapAt = 0;
        this.toggle('snap');
      } else if (now - this.pendingSnapAt > 450) {
        this.pendingSnapAt = 0; // looked like a snap, but no click: ignore
      }
    }
  }

  segment(now) {
    this.models.people.segmentForVideo(this.work, now, (result) => {
      const mask = result.confidenceMasks?.[0];
      if (!mask) return;
      const conf = mask.getAsFloat32Array();
      this.shrinkMask(conf, mask.width, mask.height);
      mask.close?.();
    });
  }

  /** Downsample confidences, dilate, feather, and refresh softMask. */
  shrinkMask(conf, mw, mh) {
    const { maskW: w, maskH: h, coverage, grown } = this;
    for (let y = 0; y < h; y++) {
      const sy = Math.min(mh - 1, Math.floor(((y + 0.5) * mh) / h));
      for (let x = 0; x < w; x++) {
        const sx = Math.min(mw - 1, Math.floor(((x + 0.5) * mw) / w));
        coverage[y * w + x] = conf[sy * mw + sx] * 255;
      }
    }
    // Separable max filter: grow the silhouette so hair and shadows at the
    // edge are covered too.
    const r = 3;
    const tmp = new Uint8ClampedArray(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let m = 0;
        for (let k = -r; k <= r; k++) {
          const xx = x + k;
          if (xx >= 0 && xx < w) m = Math.max(m, coverage[y * w + xx]);
        }
        tmp[y * w + x] = m;
      }
    }
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let m = 0;
        for (let k = -r; k <= r; k++) {
          const yy = y + k;
          if (yy >= 0 && yy < h) m = Math.max(m, tmp[yy * w + x]);
        }
        grown[y * w + x] = m > 70 ? 255 : m * 3;
      }
    }
    const px = this.maskImg.data;
    for (let i = 0; i < w * h; i++) {
      px[i * 4] = px[i * 4 + 1] = px[i * 4 + 2] = 255;
      px[i * 4 + 3] = grown[i];
    }
    this.maskSmall.getContext('2d').putImageData(this.maskImg, 0, 0);
    const s = this.softCtx;
    s.clearRect(0, 0, this.softMask.width, this.softMask.height);
    s.filter = 'blur(5px)';
    s.drawImage(this.maskSmall, 0, 0, this.softMask.width, this.softMask.height);
    s.filter = 'none';
    this.haveMask = true;
  }

  // ---------------------------------------------------------------- output

  /** Cover the person with the empty-room picture. */
  drawRoomOverPerson() {
    const p = this.patchCtx;
    const { width: w, height: h } = this.patch;
    p.globalCompositeOperation = 'copy';
    p.drawImage(this.softMask, 0, 0);
    p.globalCompositeOperation = 'source-in';
    p.drawImage(this.room.render(), 0, 0);
    p.globalCompositeOperation = 'source-over';
    this.outCtx.drawImage(this.patch, 0, 0, w, h, 0, 0, this.frameW, this.frameH);
  }

  paint(source, now) {
    const ctx = this.outCtx;
    ctx.drawImage(source, 0, 0, this.frameW, this.frameH);
    if (this.state === 'present' || !this.haveMask) return;

    this.drawRoomOverPerson();

    if (this.state === 'dissolving' || this.state === 'reforming') {
      const elapsed = (now - this.effectStart) / 1000;
      const d = this.storm.duration;
      const t = this.state === 'dissolving' ? elapsed : d - elapsed;
      this.dustCtx.putImageData(this.storm.paint(Math.max(0, Math.min(d, t))), 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(this.dustLayer, 0, 0, this.frameW, this.frameH);

      if (elapsed >= d) {
        if (this.state === 'dissolving') {
          this.setState('gone');
        } else {
          this.setState('present');
          if (this.prefs.muteMic) this.mic.unmute();
        }
        this.storm = null;
      }
    }
  }

  // ---------------------------------------------------------------- control

  /** Snapshot the person right now and turn them into a DustStorm. */
  captureStorm() {
    const { width: w, height: h } = this.work;
    const pixels = this.workCtx.getImageData(0, 0, w, h);
    // Use the un-dilated silhouette for the grains themselves.
    const a = makeCanvas(w, h);
    const actx = a.getContext('2d', { willReadFrequently: true });
    const img = new ImageData(this.maskW, this.maskH);
    for (let i = 0; i < this.coverage.length; i++) {
      img.data[i * 4 + 3] = this.coverage[i];
    }
    const small = makeCanvas(this.maskW, this.maskH);
    small.getContext('2d').putImageData(img, 0, 0);
    actx.filter = 'blur(1.5px)';
    actx.drawImage(small, 0, 0, w, h);
    const rgba = actx.getImageData(0, 0, w, h).data;
    const alpha = new Uint8ClampedArray(w * h);
    for (let i = 0; i < alpha.length; i++) alpha[i] = rgba[i * 4 + 3];
    return new DustStorm(pixels, alpha, {
      seconds: Number(this.prefs.dustSeconds) || 3,
      direction: this.prefs.direction,
    });
  }

  toggle(reason = 'manual') {
    const now = performance.now();
    if (now - this.lastToggle < COOLDOWN_MS && reason === 'snap') return;
    if (!this.haveMask) return; // models still warming up
    this.lastToggle = now;

    if (this.state === 'present') {
      if (!this.room.aiFresh) {
        this.room.quickFill();
        this.room.askAi({ force: true });
      }
      this.storm = this.captureStorm();
      this.effectStart = now;
      this.setState('dissolving');
      if (this.prefs.muteMic) this.mic.mute();
    } else if (this.state === 'gone') {
      this.storm = this.captureStorm();
      this.effectStart = now;
      this.setState('reforming');
    } else if (this.state === 'dissolving' || this.state === 'reforming') {
      // Reverse mid-flight from the same point in the animation.
      const elapsed = (now - this.effectStart) / 1000;
      this.effectStart = now - (this.storm.duration - elapsed) * 1000;
      const reforming = this.state === 'dissolving';
      this.setState(reforming ? 'reforming' : 'dissolving');
      if (!reforming && this.prefs.muteMic) this.mic.mute();
    }
    console.info(`[Snap Vanish] ${reason} → ${this.state}`);
  }

  setState(s) {
    this.state = s;
    this.onChange?.();
  }

  status() {
    return {
      state: this.state,
      ready: !!this.models && this.haveMask,
      error: this.modelError ? String(this.modelError.message || this.modelError) : null,
      aiFill: this.room?.aiReadyAt ? 'ready' : this.room?.aiBusy ? 'working' : 'waiting',
      listening: this.ear.listening,
    };
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    if (this.state !== 'present' && this.prefs.muteMic) this.mic.unmute();
    this.onChange?.(this);
  }
}
