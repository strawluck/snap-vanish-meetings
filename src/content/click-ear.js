// Listens for the sharp "click" of a finger snap on a private copy of the
// microphone track. It only reports *when* a click happened; it never records
// or sends audio. Used solely to confirm a snap the hand tracker already saw.

export class ClickEar {
  constructor() {
    this.ctx = null;
    this.source = null;
    this.copy = null;
    this.clicks = []; // timestamps (performance.now) of recent transients
    this.floor = 0.004;
    this.setSensitivity(5);
  }

  get listening() {
    return !!this.copy && this.copy.readyState === 'live';
  }

  setSensitivity(level) {
    const s = Math.min(10, Math.max(1, Number(level) || 5)) / 10;
    this.ratio = 9 - 5 * s; // how far above background noise a click must be
    this.minLevel = 0.03 - 0.018 * s;
  }

  listenTo(micTrack) {
    if (this.listening) return;
    this.stop();
    try {
      this.origin = micTrack;
      this.copy = micTrack.clone();
      this.copy.enabled = true; // stays live even when the call's mic is muted
      this.ctx = new AudioContext({ latencyHint: 'interactive' });
      this.source = this.ctx.createMediaStreamSource(new MediaStream([this.copy]));
      // ScriptProcessor avoids loading an AudioWorklet module into the page.
      const tap = this.ctx.createScriptProcessor(512, 1, 1);
      const silent = this.ctx.createGain();
      silent.gain.value = 0;
      tap.onaudioprocess = (e) => this.inspect(e.inputBuffer.getChannelData(0));
      this.source.connect(tap).connect(silent).connect(this.ctx.destination);
      this.ctx.resume().catch(() => {});
    } catch (err) {
      console.warn('[Snap Vanish] mic confirmation unavailable', err);
      this.stop();
    }
  }

  inspect(samples) {
    // A snap is broadband and very sudden: look at the sample-to-sample
    // difference (a cheap high-pass) and compare it to the running floor.
    let sum = 0;
    let peak = 0;
    for (let i = 1; i < samples.length; i++) {
      const d = samples[i] - samples[i - 1];
      sum += d * d;
      const a = Math.abs(d);
      if (a > peak) peak = a;
    }
    const level = Math.sqrt(sum / (samples.length - 1));
    const crest = peak / (level || 1e-6);

    if (level > this.minLevel && level > this.floor * this.ratio && crest > 3.2) {
      const latency = (this.ctx.baseLatency || 0) * 1000;
      this.clicks.push(performance.now() - latency);
      if (this.clicks.length > 12) this.clicks.shift();
    }
    // Follow background noise slowly, ignoring the spikes themselves.
    const target = Math.min(level, this.floor * 3);
    this.floor += (target - this.floor) * 0.02;
    this.floor = Math.max(this.floor, 0.0015);
  }

  heardClickNear(t, before = 300, after = 350) {
    return this.clicks.some((c) => c >= t - before && c <= t + after);
  }

  stop() {
    try {
      this.source?.disconnect();
    } catch {}
    this.copy?.stop();
    this.ctx?.close().catch(() => {});
    this.ctx = this.source = this.copy = this.origin = null;
  }
}
