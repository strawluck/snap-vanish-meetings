// Recognises the sound of a finger snap in raw microphone samples.
// Pure maths with no browser APIs, so it can be unit tested.
//
// A snap is a very short, very sharp burst of high-frequency sound:
//   * it jumps far above the background noise level in a few milliseconds,
//   * it's mostly above ~1.5 kHz (speech and thumps are mostly below), and
//   * it dies away again within roughly 60 ms (speech and music keep going).

export class SnapSound {
  constructor(sampleRate = 48000) {
    this.rate = sampleRate;
    this.block = Math.round(sampleRate * 0.004); // 4 ms analysis blocks
    this.setupHighPass(1500);
    this.buf = new Float32Array(this.block);
    this.fill = 0;
    this.floor = 0.002; // running background level (high-passed RMS)
    this.prev = 0;
    this.pending = null; // candidate burst waiting to prove it's short
    this.blocksSeen = 0;
    this.setSensitivity(5);
  }

  setSensitivity(level) {
    const s = Math.min(10, Math.max(1, Number(level) || 5));
    this.ratio = 15 - s; // how many times louder than the background (14 … 5)
    this.minLevel = 0.012 - s * 0.0009; // absolute floor so silence-room hiss can't trigger
  }

  setupHighPass(cutoff) {
    // RBJ biquad high-pass, Q = 0.707
    const w = (2 * Math.PI * cutoff) / this.rate;
    const alpha = Math.sin(w) / (2 * Math.SQRT1_2);
    const cos = Math.cos(w);
    const a0 = 1 + alpha;
    this.b0 = (1 + cos) / 2 / a0;
    this.b1 = -(1 + cos) / a0;
    this.b2 = this.b0;
    this.a1 = (-2 * cos) / a0;
    this.a2 = (1 - alpha) / a0;
    this.x1 = this.x2 = this.y1 = this.y2 = 0;
  }

  /**
   * Feed raw samples. Returns an array of detected snaps as offsets in
   * seconds relative to the *end* of this chunk (negative numbers).
   */
  push(samples) {
    const hits = [];
    for (let i = 0; i < samples.length; i++) {
      const x = samples[i];
      const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
      this.x2 = this.x1;
      this.x1 = x;
      this.y2 = this.y1;
      this.y1 = y;
      this.buf[this.fill++] = y;
      if (this.fill === this.block) {
        this.fill = 0;
        const hit = this.analyse();
        if (hit !== null) hits.push(hit - (samples.length - 1 - i) / this.rate);
      }
    }
    return hits;
  }

  analyse() {
    this.blocksSeen++;
    let sum = 0;
    for (let i = 0; i < this.block; i++) sum += this.buf[i] * this.buf[i];
    const e = Math.sqrt(sum / this.block);
    const blockSec = this.block / this.rate;
    let result = null;

    if (this.pending) {
      const p = this.pending;
      p.age++;
      p.peak = Math.max(p.peak, e);
      if (e < p.peak * 0.22) {
        // Decayed fast enough: that was a snap-like click.
        result = -(p.age * blockSec);
        this.pending = null;
        this.quietUntil = this.blocksSeen + Math.round(0.25 / blockSec);
      } else if (p.age * blockSec > 0.07) {
        this.pending = null; // too long to be a snap (speech, music, a bump)
      }
    } else if (
      this.blocksSeen > 25 &&
      !(this.quietUntil > this.blocksSeen) &&
      e > this.minLevel &&
      e > this.floor * this.ratio &&
      e > this.prev * 3
    ) {
      this.pending = { age: 0, peak: e };
    }

    // Track the background level, ignoring the loud blocks themselves.
    if (!this.pending) {
      const target = Math.min(e, this.floor * 4);
      this.floor += (target - this.floor) * (target < this.floor ? 0.08 : 0.01);
      this.floor = Math.max(this.floor, 0.0003);
    }
    this.prev = e;
    return result;
  }
}
