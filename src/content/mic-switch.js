// Mutes the meeting's own microphone tracks while you're dust.
// Setting track.enabled = false sends silence to the call; we only re-enable
// tracks that we muted ourselves, so a mute you did by hand is respected.
export class MicSwitch {
  constructor() {
    this.tracks = new Set();
    this.mutedByUs = new Set();
  }

  adopt(track) {
    this.tracks.add(track);
  }

  live() {
    for (const t of this.tracks) if (t.readyState === 'ended') this.tracks.delete(t);
    return [...this.tracks];
  }

  mute() {
    for (const t of this.live()) {
      if (t.enabled) {
        t.enabled = false;
        this.mutedByUs.add(t);
      }
    }
  }

  unmute() {
    for (const t of this.mutedByUs) if (t.readyState === 'live') t.enabled = true;
    this.mutedByUs.clear();
  }
}
