// One live camera feed going through Snap Vanish.
//
// States:  present → dissolving → gone → reforming → present
//
// Each frame: read the camera, track hands (snap detection), segment the
// person, keep the room memory up to date, then paint the output canvas the
// meeting app is streaming.
//
// The empty room comes from one of two places:
//  * a room photo the user took with the countdown (cleanest), or
//  * the learned room memory + AI fill (no setup needed).
import { loadVisionModels } from './vision-models.js';
import { SnapGesture } from './snap-gesture.js';
import { EmptyRoom, ROOM_W } from './empty-room.js';
import { DustStorm } from './dust-storm.js';
import { loadRoomPhoto, saveRoomPhoto } from './room-photo.js';

const MASK_W = 160; // working resolution for silhouette maths
const COOLDOWN_MS = 1600;
const CLEAR_FRAMES = 6; // a cell must look empty this many masks in a row (~0.4 s) before it is learned
const PHOTO_COUNTDOWN_S = 5;

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
    this.clickCursor = performance.now();
    this.lastToggle = 0;
    this.frameNo = 0;
    this.closed = false;
    this.handBoxes = [];
    this.roomPhoto = null; // canvas at camera resolution
    this.photoJob = null; // { at, message }

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
    const n = MASK_W * mh;
    this.coverage = new Uint8ClampedArray(n); // raw person confidence (+ hands)
    this.grown = new Uint8ClampedArray(n); // dilated person
    this.held = new Float32Array(n); // grown, slow to release (cover mask)
    this.clearRun = new Uint8Array(n); // frames in a row a cell looked empty
    this.maskImg = new ImageData(MASK_W, mh);
    this.safeImg = new ImageData(MASK_W, mh);
    this.maskSmall = makeCanvas(MASK_W, mh);
    this.safeMask = makeCanvas(MASK_W, mh); // hard mask: OK to learn here
    this.softMask = makeCanvas(ROOM_W, rh); // feathered cover, room resolution
    this.softCtx = this.softMask.getContext('2d');
    this.patch = makeCanvas(ROOM_W, rh);
    this.patchCtx = this.patch.getContext('2d');
    this.dustLayer = makeCanvas(ROOM_W, rh);
    this.dustCtx = this.dustLayer.getContext('2d');
    this.room = new EmptyRoom(ROOM_W, rh);
    this.haveMask = false;
    this.loadSavedPhoto(w, h);
  }

  async loadSavedPhoto(w, h) {
    const img = await loadRoomPhoto(w, h);
    if (img && this.frameW === w && this.frameH === h) {
      const c = makeCanvas(w, h);
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      this.roomPhoto = c;
      this.onChange?.();
    }
  }

  tick(source, w, h) {
    if (!w || !h) return;
    this.ensureBuffers(w, h);
    const now = performance.now();
    this.frameNo++;
    this.workCtx.drawImage(source, 0, 0, this.work.width, this.work.height);

    const present = this.state === 'present';
    if (this.models) {
      this.watchHands(now);
      // Segment every frame while the effect is on, every other frame otherwise.
      if (!present || this.frameNo % 2 === 0) this.segment(now);
      // Only learn the room while you're visibly present. While vanished the
      // room picture is frozen, so nothing of you can creep into it.
      if (present && this.haveMask && this.frameNo % 3 === 0) {
        this.room.learn(this.work, this.safeMask);
        if (!this.roomPhoto) this.room.askAi();
      }
    }
    if (this.photoJob) this.runPhotoJob(source, now);
    this.paint(source, now);
  }

  watchHands(now) {
    const res = this.models.hands.detectForVideo(this.work, now);
    const hands = (res.landmarks || []).map((landmarks, i) => ({
      landmarks,
      handedness: res.handedness?.[i]?.[0]?.categoryName || String(i),
    }));
    // The person segmenter often misses a raised, motion-blurred hand, so
    // we treat a box around every tracked hand as "person" too.
    this.handBoxes = hands.map(({ landmarks }) => {
      let x0 = 1, y0 = 1, x1 = 0, y1 = 0;
      for (const p of landmarks) {
        x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y);
        x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y);
      }
      const padX = (x1 - x0) * 0.35 + 0.02;
      const padY = (y1 - y0) * 0.35 + 0.02;
      return [x0 - padX, y0 - padY, x1 + padX, y1 + padY * 2.5]; // extra below: the wrist/arm
    });

    const aspect = this.work.width / this.work.height;
    const sawFlick = this.gesture.update(hands, now, aspect);

    if (!this.prefs.confirmWithSound || !this.ear.listening) {
      // Camera only: needs the whole flick to be seen.
      if (sawFlick) this.toggle('snap');
      return;
    }
    // Sound-led: each snap sound counts if a hand was up in snap position
    // just before it (or the flick was seen). Typing, claps or talking with
    // your hands down don't pass this check.
    for (const t of this.ear.takeClicks(this.clickCursor)) {
      if (now - t < 200) break; // give the video a moment to catch up
      this.clickCursor = t;
      const ready = this.gesture.readyAt;
      if (ready >= t - 1200 && ready <= t + 200) {
        this.toggle('snap');
      } else {
        console.info('[Snap Vanish] heard a click, but no hand was in snap position');
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

  /** Downsample confidences, add hands, dilate, and refresh the masks. */
  shrinkMask(conf, mw, mh) {
    const { maskW: w, maskH: h, coverage, grown, held, clearRun } = this;
    for (let y = 0; y < h; y++) {
      const sy = Math.min(mh - 1, Math.floor(((y + 0.5) * mh) / h));
      for (let x = 0; x < w; x++) {
        const sx = Math.min(mw - 1, Math.floor(((x + 0.5) * mw) / w));
        coverage[y * w + x] = conf[sy * mw + sx] * 255;
      }
    }
    for (const [x0, y0, x1, y1] of this.handBoxes) {
      const ax = Math.max(0, Math.floor(x0 * w));
      const bx = Math.min(w - 1, Math.ceil(x1 * w));
      const ay = Math.max(0, Math.floor(y0 * h));
      const by = Math.min(h - 1, Math.ceil(y1 * h));
      for (let y = ay; y <= by; y++) coverage.fill(255, y * w + ax, y * w + bx + 1);
    }

    // Separable max filter: grow the silhouette so hair, blur and shadows at
    // the edge are covered too. Anything the model is even slightly unsure
    // about (> ~12%) counts as person.
    const r = 4;
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
    const present = this.state === 'present';
    const px = this.maskImg.data;
    const safe = this.safeImg.data;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let m = 0;
        for (let k = -r; k <= r; k++) {
          const yy = y + k;
          if (yy >= 0 && yy < h) m = Math.max(m, tmp[yy * w + x]);
        }
        const i = y * w + x;
        const person = m > 30;
        grown[i] = person ? 255 : m * 8;
        // Cover mask: while vanished it lets go slowly, so a quick move
        // never uncovers you for a frame.
        held[i] = present ? grown[i] : Math.max(grown[i], held[i] * 0.93);
        // Learn a cell only after it has looked empty for a while.
        clearRun[i] = person ? 0 : Math.min(255, clearRun[i] + 1);
        px[i * 4] = px[i * 4 + 1] = px[i * 4 + 2] = 255;
        px[i * 4 + 3] = held[i];
        safe[i * 4] = safe[i * 4 + 1] = safe[i * 4 + 2] = 255;
        safe[i * 4 + 3] = clearRun[i] >= CLEAR_FRAMES ? 255 : 0;
      }
    }
    this.maskSmall.getContext('2d').putImageData(this.maskImg, 0, 0);
    this.safeMask.getContext('2d').putImageData(this.safeImg, 0, 0);
    const s = this.softCtx;
    s.clearRect(0, 0, this.softMask.width, this.softMask.height);
    s.filter = 'blur(4px)';
    s.drawImage(this.maskSmall, 0, 0, this.softMask.width, this.softMask.height);
    s.filter = 'none';
    this.haveMask = true;
  }

  // ---------------------------------------------------------------- room photo

  /** Countdown, then save a photo of the empty room (user steps out). */
  startRoomPhoto() {
    this.photoJob = { at: performance.now() + PHOTO_COUNTDOWN_S * 1000, message: '' };
    this.onChange?.();
  }

  clearRoomPhoto() {
    this.roomPhoto = null;
    saveRoomPhoto(null);
    this.onChange?.();
  }

  runPhotoJob(source, now) {
    const job = this.photoJob;
    if (job.done) return;
    if (now < job.at) return;
    // Refuse if someone is still clearly in the frame.
    let filled = 0;
    for (const v of this.coverage) if (v > 128) filled++;
    if (this.haveMask && filled / this.coverage.length > 0.03) {
      job.done = true;
      job.message = 'You were still in the picture. Try again and step fully out of view.';
    } else {
      const c = makeCanvas(this.frameW, this.frameH);
      c.getContext('2d').drawImage(source, 0, 0, this.frameW, this.frameH);
      this.roomPhoto = c;
      saveRoomPhoto(c);
      job.done = true;
      job.message = 'Room photo saved.';
    }
    setTimeout(() => {
      if (this.photoJob === job) this.photoJob = null;
    }, 4000);
    this.onChange?.();
  }

  // ---------------------------------------------------------------- output

  /** Cover the person with the empty-room picture. */
  drawRoomOverPerson() {
    const ctx = this.outCtx;
    if (this.roomPhoto) {
      // Real photo of the empty room: show it full-frame. Nothing live is
      // left on screen, so nothing of you can show through.
      ctx.drawImage(this.roomPhoto, 0, 0, this.frameW, this.frameH);
      return;
    }
    const p = this.patchCtx;
    const { width: w, height: h } = this.patch;
    p.globalCompositeOperation = 'copy';
    p.drawImage(this.softMask, 0, 0);
    p.globalCompositeOperation = 'source-in';
    p.drawImage(this.room.render(), 0, 0);
    p.globalCompositeOperation = 'source-over';
    ctx.drawImage(this.patch, 0, 0, w, h, 0, 0, this.frameW, this.frameH);
  }

  drawCountdown(now) {
    const job = this.photoJob;
    const ctx = this.outCtx;
    const text = job.done ? job.message : `Step out of view… ${Math.ceil((job.at - now) / 1000)}`;
    const size = Math.round(this.frameH / 16);
    ctx.save();
    ctx.font = `600 ${size}px system-ui, sans-serif`;
    const tw = ctx.measureText(text).width;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect((this.frameW - tw) / 2 - size, size, tw + size * 2, size * 1.8);
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, (this.frameW - tw) / 2, size * 1.9);
    ctx.restore();
  }

  paint(source, now) {
    const ctx = this.outCtx;
    ctx.drawImage(source, 0, 0, this.frameW, this.frameH);
    if (this.state !== 'present' && this.haveMask) {
      this.drawRoomOverPerson();
      if (this.state === 'dissolving' || this.state === 'reforming') this.drawDust(now);
    }
    if (this.photoJob) this.drawCountdown(now);
  }

  drawDust(now) {
    const ctx = this.outCtx;
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
      if (!this.roomPhoto && !this.room.aiFresh) {
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
    const job = this.photoJob;
    return {
      state: this.state,
      ready: !!this.models && this.haveMask,
      error: this.modelError ? String(this.modelError.message || this.modelError) : null,
      aiFill: this.room?.aiReadyAt ? 'ready' : this.room?.aiBusy ? 'working' : 'waiting',
      listening: this.ear.listening,
      handSeen: performance.now() - this.gesture.handAt < 500,
      handReady: performance.now() - this.gesture.readyAt < 500,
      heardAgo: this.ear.lastClick ? Math.round(performance.now() - this.ear.lastClick) : null,
      roomPhoto: !!this.roomPhoto,
      photo: job
        ? job.done
          ? { message: job.message }
          : { countdown: Math.max(0, Math.ceil((job.at - performance.now()) / 1000)) }
        : null,
    };
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    if (this.state !== 'present' && this.prefs.muteMic) this.mic.unmute();
    this.onChange?.(this);
  }
}
