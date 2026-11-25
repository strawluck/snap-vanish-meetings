// The disintegration effect. Every pixel of your silhouette becomes a grain
// of dust. Grains peel away in drifting patches, darken to ash and blow off
// in the chosen direction. Motion is a closed-form function of time, so
// playing the effect backwards (reappearing) is the exact same maths with the
// clock running in reverse.

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
   * @param {ImageData} pixels  snapshot of the frame (effect resolution)
   * @param {Uint8ClampedArray} alpha  person coverage 0..255, same size
   * @param {{seconds:number, direction:string}} opts
   */
  constructor(pixels, alpha, { seconds, direction }) {
    const { width: w, height: h, data } = pixels;
    this.w = w;
    this.h = h;
    this.seconds = seconds;
    this.out = new ImageData(w, h);
    this.out32 = new Uint32Array(this.out.data.buffer);

    let [wx, wy] = windFor(direction, Math.random());
    const len = Math.hypot(wx, wy);
    wx /= len;
    wy /= len;
    this.wind = [wx, wy];

    // Collect the silhouette.
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
    this.count = count;
    this.x0 = new Float32Array(count);
    this.y0 = new Float32Array(count);
    this.start = new Float32Array(count); // when the grain lets go (s)
    this.life = new Float32Array(count); // how long it stays visible (s)
    this.speed = new Float32Array(count);
    this.phase = new Float32Array(count);
    this.rgb = new Uint32Array(count);

    const span = maxP - minP || 1;
    const peel = seconds * 0.62; // time over which the body peels away
    let k = 0;
    for (let i = 0; i < w * h; i++) {
      if (alpha[i] <= 90) continue;
      const x = i % w;
      const y = (i / w) | 0;
      // Leading edge (downwind) goes first, with blotchy noise on top.
      const along = 1 - ((x * wx + y * wy) - minP) / span;
      const n = blotch(x / 22, y / 22) * 0.65 + blotch(x / 6, y / 6) * 0.35;
      this.x0[k] = x;
      this.y0[k] = y;
      this.start[k] = peel * (0.55 * along + 0.45 * n);
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
   * Draw the state at time t (seconds since the snap). For reappearing, call
   * with t running from duration down to 0.
   */
  paint(t) {
    const { w, h, out32, wind } = this;
    out32.fill(0);
    const reach = Math.max(w, h) * 0.55;
    const [wx, wy] = wind;

    for (let k = 0; k < this.count; k++) {
      const c = this.rgb[k];
      const age = t - this.start[k];
      let x = this.x0[k];
      let y = this.y0[k];
      let a = 255;
      let r = (c >> 16) & 255;
      let g = (c >> 8) & 255;
      let b = c & 255;

      if (age > 0) {
        const u = age / this.life[k];
        if (u >= 1) continue;
        const s = this.speed[k];
        // Accelerating drift downwind + a lazy sideways curl + slight rise.
        const d = reach * s * (0.35 * u + 0.65 * u * u);
        const curl = Math.sin(u * 5 + this.phase[k]) * 14 * u * s;
        x += wx * d - wy * curl;
        y += wy * d + wx * curl - 18 * u * u;
        // Small grains flicker out; colour sinks to ash.
        const ash = Math.min(1, u * 2.4);
        r += (ASH[0] - r) * ash;
        g += (ASH[1] - g) * ash;
        b += (ASH[2] - b) * ash;
        a = 255 * (1 - u) * (1 - u * 0.35);
        if ((k & 3) === 0 && u > 0.15) continue; // thin the cloud a little
      } else if (age > -0.08) {
        // Just before letting go, the edge darkens and cracks.
        const f = (age + 0.08) / 0.08;
        r *= 1 - 0.45 * f;
        g *= 1 - 0.45 * f;
        b *= 1 - 0.45 * f;
      }

      const xi = x | 0;
      const yi = y | 0;
      if (xi < 0 || yi < 0 || xi >= w || yi >= h) continue;
      const px = ((a & 255) << 24) | ((b & 255) << 16) | ((g & 255) << 8) | (r & 255);
      out32[yi * w + xi] = px;
      // Some airborne grains are a little chunkier, which reads as flakes.
      if (age > 0 && k % 3 === 0 && xi + 1 < w && yi + 1 < h) {
        out32[yi * w + xi + 1] = px;
        out32[(yi + 1) * w + xi] = px;
      }
    }
    return this.out;
  }
}
