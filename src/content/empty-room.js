// Builds a picture of the room *without you in it*.
//
// 1. While you're on camera, every pixel the segmenter says is background is
//    blended into a "room memory" canvas, so lean left and the wall you were
//    covering gets learned.
// 2. Whatever was never seen (usually the chair and wall right behind you) is
//    painted in by MI-GAN, an image-inpainting network that runs locally in
//    the extension's offscreen page.
// 3. Until the AI result arrives, a fast pyramid fill keeps the hole covered.
import { MSG } from '../shared/prefs.js';

const canvas = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

export const ROOM_W = 640;

export class EmptyRoom {
  constructor(width, height) {
    this.w = width;
    this.h = height;
    this.memory = canvas(width, height); // learned background (alpha = known)
    this.memoryCtx = this.memory.getContext('2d', { willReadFrequently: true });
    this.cutout = canvas(width, height); // scratch: frame minus person
    this.cutoutCtx = this.cutout.getContext('2d');
    this.filler = canvas(width, height); // AI / quick fill for unknown parts
    this.fillerCtx = this.filler.getContext('2d');
    this.view = canvas(width, height); // filler + memory, what gets shown
    this.viewCtx = this.view.getContext('2d');

    this.aiBusy = false;
    this.aiReadyAt = 0;
    this.lastAiAsk = 0;
    this.learnedSinceAi = 0;
    this.holeShare = 1;
  }

  /** Blend the current frame into memory where no person is present. */
  learn(frame, personMask) {
    const { cutoutCtx: c, memoryCtx: m, w, h } = this;
    c.globalCompositeOperation = 'copy';
    c.drawImage(frame, 0, 0, w, h);
    c.globalCompositeOperation = 'destination-out';
    c.drawImage(personMask, 0, 0, w, h); // dilated + feathered silhouette
    c.globalCompositeOperation = 'source-over';

    // Unknown pixels get the frame at full strength, known ones drift slowly
    // so lighting changes are followed without ghosting.
    m.globalCompositeOperation = 'destination-over';
    m.drawImage(this.cutout, 0, 0);
    m.globalCompositeOperation = 'source-over';
    m.globalAlpha = 0.12;
    m.drawImage(this.cutout, 0, 0);
    m.globalAlpha = 1;
    this.learnedSinceAi++;
  }

  /** Known/unknown map at 1/4 resolution. A cell counts as known only if all
   *  of its pixels are fully learned, which keeps soft edges out of the AI's
   *  "trusted" area. */
  knownGrid() {
    const gw = Math.ceil(this.w / 4);
    const gh = Math.ceil(this.h / 4);
    const { data } = this.memoryCtx.getImageData(0, 0, this.w, this.h);
    const known = new Uint8Array(gw * gh).fill(1);
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        if (data[(y * this.w + x) * 4 + 3] < 250) known[(y >> 2) * gw + (x >> 2)] = 0;
      }
    }
    let holes = 0;
    for (const k of known) holes += 1 - k;
    this.holeShare = holes / known.length;
    return { known, gw, gh, data };
  }

  /** Fast fallback: push-pull pyramid fill of the holes (no AI). */
  quickFill() {
    const { known, gw, gh, data } = this.knownGrid();
    // Average colour per grid cell, weighted by known-ness.
    let level = { w: gw, h: gh, rgb: new Float32Array(gw * gh * 3), wt: new Float32Array(gw * gh) };
    for (let gy = 0; gy < gh; gy++) {
      for (let gx = 0; gx < gw; gx++) {
        const i = gy * gw + gx;
        if (!known[i]) continue;
        const p = (Math.min(this.h - 1, gy * 4 + 2) * this.w + Math.min(this.w - 1, gx * 4 + 2)) * 4;
        level.rgb[i * 3] = data[p];
        level.rgb[i * 3 + 1] = data[p + 1];
        level.rgb[i * 3 + 2] = data[p + 2];
        level.wt[i] = 1;
      }
    }
    const pyramid = [level];
    while (level.w > 1 || level.h > 1) {
      const w = Math.max(1, level.w >> 1);
      const h = Math.max(1, level.h >> 1);
      const next = { w, h, rgb: new Float32Array(w * h * 3), wt: new Float32Array(w * h) };
      for (let y = 0; y < level.h; y++) {
        for (let x = 0; x < level.w; x++) {
          const s = y * level.w + x;
          const d = Math.min(h - 1, y >> 1) * w + Math.min(w - 1, x >> 1);
          const wt = level.wt[s];
          next.wt[d] += wt;
          next.rgb[d * 3] += level.rgb[s * 3] * wt;
          next.rgb[d * 3 + 1] += level.rgb[s * 3 + 1] * wt;
          next.rgb[d * 3 + 2] += level.rgb[s * 3 + 2] * wt;
        }
      }
      for (let i = 0; i < w * h; i++) {
        if (next.wt[i] > 0) {
          next.rgb[i * 3] /= next.wt[i];
          next.rgb[i * 3 + 1] /= next.wt[i];
          next.rgb[i * 3 + 2] /= next.wt[i];
          next.wt[i] = 1;
        }
      }
      pyramid.push(next);
      level = next;
    }
    for (let k = pyramid.length - 2; k >= 0; k--) {
      const fine = pyramid[k];
      const coarse = pyramid[k + 1];
      for (let y = 0; y < fine.h; y++) {
        for (let x = 0; x < fine.w; x++) {
          const i = y * fine.w + x;
          if (fine.wt[i] > 0) continue;
          const j = Math.min(coarse.h - 1, y >> 1) * coarse.w + Math.min(coarse.w - 1, x >> 1);
          fine.rgb[i * 3] = coarse.rgb[j * 3];
          fine.rgb[i * 3 + 1] = coarse.rgb[j * 3 + 1];
          fine.rgb[i * 3 + 2] = coarse.rgb[j * 3 + 2];
          fine.wt[i] = 1;
        }
      }
    }
    const base = pyramid[0];
    const small = canvas(gw, gh);
    const img = small.getContext('2d').createImageData(gw, gh);
    for (let i = 0; i < gw * gh; i++) {
      img.data[i * 4] = base.rgb[i * 3];
      img.data[i * 4 + 1] = base.rgb[i * 3 + 1];
      img.data[i * 4 + 2] = base.rgb[i * 3 + 2];
      img.data[i * 4 + 3] = 255;
    }
    small.getContext('2d').putImageData(img, 0, 0);
    this.fillerCtx.imageSmoothingQuality = 'high';
    this.fillerCtx.filter = 'blur(6px)';
    this.fillerCtx.drawImage(small, 0, 0, this.w, this.h);
    this.fillerCtx.filter = 'none';
  }

  get aiFresh() {
    return this.aiReadyAt > 0 && this.learnedSinceAi < 150;
  }

  /** Ask the offscreen MI-GAN worker to paint the unknown area. */
  async askAi({ force = false } = {}) {
    const now = performance.now();
    if (this.aiBusy || (!force && now - this.lastAiAsk < 8000)) return;
    const { known, gw, gh } = this.knownGrid();
    if (this.holeShare < 0.002) {
      // Nothing to invent: the room memory is complete.
      this.fillerCtx.drawImage(this.memory, 0, 0);
      this.aiReadyAt = now;
      this.learnedSinceAi = 0;
      return;
    }
    if (this.holeShare > 0.92) return; // not enough room to go on yet

    this.aiBusy = true;
    this.lastAiAsk = now;
    try {
      const maskSmall = canvas(gw, gh);
      const mctx = maskSmall.getContext('2d');
      const mimg = mctx.createImageData(gw, gh);
      known.forEach((k, i) => {
        const v = k ? 255 : 0;
        mimg.data.set([v, v, v, 255], i * 4);
      });
      mctx.putImageData(mimg, 0, 0);
      const mask = canvas(this.w, this.h);
      const mk = mask.getContext('2d');
      mk.imageSmoothingEnabled = false;
      mk.drawImage(maskSmall, 0, 0, this.w, this.h);

      const photo = canvas(this.w, this.h);
      const pk = photo.getContext('2d');
      pk.drawImage(this.filler, 0, 0); // neutral-ish guess under the holes
      pk.drawImage(this.memory, 0, 0);

      const learnedBefore = this.learnedSinceAi;
      const reply = await chrome.runtime.sendMessage({
        type: MSG.INPAINT,
        image: photo.toDataURL('image/png'),
        mask: mask.toDataURL('image/png'),
      });
      if (!reply?.ok) throw new Error(reply?.error || 'no reply from inpainter');

      const img = new Image();
      img.src = reply.image;
      await img.decode();
      this.fillerCtx.drawImage(img, 0, 0, this.w, this.h);
      this.aiReadyAt = performance.now();
      this.learnedSinceAi = Math.max(0, this.learnedSinceAi - learnedBefore);
    } catch (err) {
      console.warn('[Snap Vanish] AI room fill failed, using quick fill', err);
    } finally {
      this.aiBusy = false;
    }
  }

  /** Compose the room picture: AI/quick fill underneath, learned memory on top. */
  render() {
    this.viewCtx.drawImage(this.filler, 0, 0);
    this.viewCtx.drawImage(this.memory, 0, 0);
    return this.view;
  }
}
