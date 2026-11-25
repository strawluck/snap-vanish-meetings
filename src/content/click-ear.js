// Listens for the sound of a finger snap on the microphone.
//
// Meet's own mic track has noise suppression on, which is designed to remove
// exactly this kind of click. So we open our own copy of the same microphone
// with noise suppression, echo cancellation and auto gain turned off. It
// never leaves this tab, is never recorded, and is only checked for clicks.
import { SnapSound } from './snap-sound.js';

export class ClickEar {
  constructor() {
    this.ctx = null;
    this.stream = null;
    this.origin = null; // the meeting's mic track we follow
    this.detector = null;
    this.clicks = []; // performance.now() times of recent snap sounds
    this.sensitivity = 5;
    this.opening = null;
  }

  get listening() {
    return !!this.stream && this.stream.getAudioTracks().some((t) => t.readyState === 'live');
  }

  setSensitivity(level) {
    this.sensitivity = level;
    this.detector?.setSensitivity(level);
  }

  /** Start listening on the same device as the meeting's mic track. */
  async listenTo(micTrack) {
    if (this.listening || this.opening) return;
    this.opening = (async () => {
      this.stop();
      this.origin = micTrack;
      const deviceId = micTrack?.getSettings?.().deviceId;
      const raw = { echoCancellation: false, noiseSuppression: false, autoGainControl: false };
      try {
        // The isolated world sees the browser's own getUserMedia, not the
        // page hook, so this stream doesn't go through Snap Vanish.
        this.stream = await navigator.mediaDevices
          .getUserMedia({ audio: deviceId ? { ...raw, deviceId: { exact: deviceId } } : raw })
          .catch((err) => {
            if (!deviceId || err?.name !== 'OverconstrainedError') throw err;
            return navigator.mediaDevices.getUserMedia({ audio: raw }); // default mic
          });
      } catch (err) {
        console.info('[Snap Vanish] raw mic unavailable, using the meeting mic', err);
        const copy = micTrack.clone();
        copy.enabled = true;
        this.stream = new MediaStream([copy]);
      }
      this.ctx = new AudioContext({ latencyHint: 'interactive' });
      this.detector = new SnapSound(this.ctx.sampleRate);
      this.detector.setSensitivity(this.sensitivity);
      const source = this.ctx.createMediaStreamSource(this.stream);
      // ScriptProcessor avoids loading an AudioWorklet module into the page.
      const tap = this.ctx.createScriptProcessor(1024, 1, 1);
      const silent = this.ctx.createGain();
      silent.gain.value = 0;
      tap.onaudioprocess = (e) => {
        const hits = this.detector.push(e.inputBuffer.getChannelData(0));
        if (!hits.length) return;
        const latency = ((this.ctx.baseLatency || 0) + 1024 / this.ctx.sampleRate) * 1000;
        const now = performance.now();
        for (const offset of hits) this.clicks.push(now + offset * 1000 - latency);
        while (this.clicks.length > 8) this.clicks.shift();
      };
      source.connect(tap).connect(silent).connect(this.ctx.destination);
      this.ctx.resume().catch(() => {});
    })()
      .catch((err) => {
        console.warn('[Snap Vanish] snap sound detection unavailable', err);
        this.stop();
      })
      .finally(() => (this.opening = null));
    return this.opening;
  }

  /** Snap sounds heard since `since` (and not yet used). */
  takeClicks(since) {
    const fresh = this.clicks.filter((t) => t > since);
    return fresh;
  }

  get lastClick() {
    return this.clicks.at(-1) ?? 0;
  }

  stop() {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.ctx?.close().catch(() => {});
    this.ctx = this.stream = this.origin = this.detector = null;
  }
}
