// The disintegration effect.
//
// A "release field" gives every pixel of the frame the moment it turns to
// dust: the downwind edge goes first, in drifting blotches. Each frame:
//   * `release` is a stencil of the pixels that are still attached. The
//     caller uses it to show the LIVE camera there, so the part of you that
//     hasn't turned to dust yet is always the real you, moving and sharp.
//   * `grains` holds the dust in flight. Grains take their colour from the
//     live camera at their home spot, and their home follows you if you move.
// Grain motion is a closed-form function of time, so coming back is the same
// maths with the clock running backwards.

const ASH = [86, 78, 70];

function hash(x, y) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

// Smooth 2D value noise, used to make the dissolve happen in blotches.
function blotch(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const fx = x - xi;
  const fy = y - yi;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

function windFor(direction, seed) {
  switch (direction) {
    case 'left':
      return [-1, -0.25];
    case 'up':
      return [0.15, -1];
    case 'random': {
      const angle = -Math.PI * (0.1 + seed * 0.8); // somewhere in the upper half
      return [Math.cos(angle), Math.sin(angle)];
    }
    default:
      return [1, -0.25];
  }
}

export class DustStorm {
  /**
   * @param {ImageData} pixels  frame at the moment of the snap (effect resolution)
   * @param {Uint8ClampedArray} alpha  person coverage 0..255, same size
   * @param {{seconds:number, direction:string}} opts
   */
  constructor(pixels, alpha, { seconds, direction }) {
    const { width: w, height: h, data } = pixels;
    this.w = w;
    this.h = h;
    this.seconds = seconds;
    this.grains = new ImageData(w, h);
    this.grains32 = new Uint32Array(this.grains.data.buffer);
    this.release = new ImageData(w, h); // alpha 255 = still attached
    this.release32 = new Uint32Array(this.release.data.buffer);

    let [wx, wy] = windFor(direction, Math.random());
    const len = Math.hypot(wx, wy);
    wx /= len;
    wy /= len;
    this.wind = [wx, wy];

    // Silhouette extent along the wind direction.
    let count = 0;
    let minP = Infinity;
    let maxP = -Infinity;
    for (let i = 0; i < w * h; i++) {
      if (alpha[i] > 90) {
        count++;
        const p = (i % w) * wx + ((i / w) | 0) * wy;
        if (p < minP) minP = p;
        if (p > maxP) maxP = p;
      }
    }
    if (!count) {
      minP = 0;
      maxP = w;
    }
    const span = maxP - minP || 1;
    const peel = seconds * 0.62; // time over which the body peels away

    // Release time for every pixel in the frame, not just the silhouette, so
    // the live stencil stays valid wherever you move during the effect.
    this.field = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const along = Math.min(1, Math.max(0, 1 - (x * wx + y * wy - minP) / span));
        const n = blotch(x / 22, y / 22) * 0.65 + blotch(x / 6, y / 6) * 0.35;
        this.field[y * w + x] = peel * (0.55 * along + 0.45 * n);
      }
    }

    this.count = count;
    this.x0 = new Float32Array(count);
    this.y0 = new Float32Array(count);
    this.start = new Float32Array(count);
    this.life = new Float32Array(count);
    this.speed = new Float32Array(count);
    this.phase = new Float32Array(count);
    this.rgb = new Uint32Array(count); // fallback colour if you've moved away
    let k = 0;
    for (let i = 0; i < w * h; i++) {
      if (alpha[i] <= 90) continue;
      const x = i % w;
      const y = (i / w) | 0;
      this.x0[k] = x;
      this.y0[k] = y;
      this.start[k] = this.field[i];
      this.life[k] = seconds * (0.18 + 0.22 * hash(x + 7, y + 3));
      this.speed[k] = 0.6 + hash(x + 1, y + 9) * 0.9;
      this.phase[k] = hash(x + 5, y + 2) * Math.PI * 2;
      const p = i * 4;
      this.rgb[k] = (data[p] << 16) | (data[p + 1] << 8) | data[p + 2];
      k++;
    }
    this.total = peel + seconds * 0.42;
  }

  /** Total running time of the effect in seconds. */
  get duration() {
    return this.total;
  }

  /**
   * Update `release` and `grains` for time t (seconds since the snap; for
   * coming back, call with t running from duration down to 0).
   * @param {number} t
   * @param {{rgba: Uint8ClampedArray, cover: Uint8ClampedArray, gw: number, gh: number,
   *          dx: number, dy: number}} live  current frame, person grid, and how far
   *          the person has moved since the snap (effect pixels)
   */
  paint(t, live) {
    const { w, h, field, release32, grains32, wind } = this;
    const dx = Math.round(live.dx);
    const dy = Math.round(live.dy);

    // Attached stencil: pixels whose release time hasn't come yet. The field
    // moves with you, so the same parts of your body go first.
    for (let y = 0; y < h; y++) {
      const fy = Math.min(h - 1, Math.max(0, y - dy));
      for (let x = 0; x < w; x++) {
        const fx = Math.min(w - 1, Math.max(0, x - dx));
        release32[y * w + x] = field[fy * w + fx] > t ? 0xff000000 : 0;
      }
    }

    grains32.fill(0);
    const reach = Math.max(w, h) * 0.55;
    const [wx, wy] = wind;
    const { rgba, cover, gw, gh } = live;
    const cellW = w / gw;
    const cellH = h / gh;

    for (let k = 0; k < this.count; k++) {
      const age = t - this.start[k];
      if (age <= 0) continue; // still attached: shown by the live stencil
      const u = age / this.life[k];
      if (u >= 1) continue;
      if ((k & 3) === 0 && u > 0.15) continue; // thin the cloud a little

      // Home position follows you; colour comes from the live camera there.
      const hx = this.x0[k] + dx;
      const hy = this.y0[k] + dy;
      let r, g, b;
      const hxi = hx | 0;
      const hyi = hy | 0;
      const inFrame = hxi >= 0 && hyi >= 0 && hxi < w && hyi < h;
      if (inFrame && cover[((hyi / cellH) | 0) * gw + ((hxi / cellW) | 0)] > 90) {
        const p = (hyi * w + hxi) * 4;
        r = rgba[p];
        g = rgba[p + 1];
        b = rgba[p + 2];
      } else {
        const c = this.rgb[k];
        r = (c >> 16) & 255;
        g = (c >> 8) & 255;
        b = c & 255;
      }

      const s = this.speed[k];
      // Accelerating drift downwind + a lazy sideways curl + slight rise.
      const d = reach * s * (0.35 * u + 0.65 * u * u);
      const curl = Math.sin(u * 5 + this.phase[k]) * 14 * u * s;
      const x = hx + wx * d - wy * curl;
      const y = hy + wy * d + wx * curl - 18 * u * u;
      // Colour sinks to ash, grains fade out.
      const ash = Math.min(1, u * 2.4);
      r += (ASH[0] - r) * ash;
      g += (ASH[1] - g) * ash;
      b += (ASH[2] - b) * ash;
      const a = 255 * (1 - u) * (1 - u * 0.35);

      const xi = x | 0;
      const yi = y | 0;
      if (xi < 0 || yi < 0 || xi >= w || yi >= h) continue;
      const px = ((a & 255) << 24) | ((b & 255) << 16) | ((g & 255) << 8) | (r & 255);
      grains32[yi * w + xi] = px;
      // Some grains are a little chunkier, which reads as flakes.
      if (k % 3 === 0 && xi + 1 < w && yi + 1 < h) {
        grains32[yi * w + xi + 1] = px;
        grains32[(yi + 1) * w + xi] = px;
      }
    }
  }
}
