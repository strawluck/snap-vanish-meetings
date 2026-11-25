// Finger-snap recognition from hand landmarks.
//
// A snap has a very specific shape that typing, waving or scratching your
// head doesn't have:
//   1. "Loaded": the thumb tip and middle-finger tip press together while the
//      ring and pinky fingers are folded toward the palm.
//   2. "Fired": within a few frames, the middle finger slips off the thumb and
//      slams down toward the base of the palm — the thumb/middle gap opens
//      quickly while the middle tip gets *closer* to the wrist.
// Everything is measured relative to the hand's own size, so distance from
// the camera doesn't matter.

const L = {
  WRIST: 0,
  THUMB_TIP: 4,
  INDEX_MCP: 5,
  MIDDLE_MCP: 9,
  MIDDLE_TIP: 12,
  RING_MCP: 13,
  RING_TIP: 16,
  PINKY_MCP: 17,
  PINKY_TIP: 20,
};

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

function describeHand(points, aspect) {
  // Landmarks are normalised to the image; correct x for non-square frames.
  const p = points.map((q) => ({ x: q.x * aspect, y: q.y }));
  const size = dist(p[L.WRIST], p[L.MIDDLE_MCP]) || 1e-3;
  const folded = (tip, mcp) => dist(p[tip], p[L.WRIST]) < dist(p[mcp], p[L.WRIST]) * 1.35;
  return {
    gap: dist(p[L.THUMB_TIP], p[L.MIDDLE_TIP]) / size,
    reach: dist(p[L.MIDDLE_TIP], p[L.WRIST]) / size,
    tip: p[L.MIDDLE_TIP],
    size,
    curled: (folded(L.RING_TIP, L.RING_MCP) ? 1 : 0) + (folded(L.PINKY_TIP, L.PINKY_MCP) ? 1 : 0),
  };
}

export class SnapGesture {
  constructor() {
    this.tracks = new Map(); // handedness → { loadedAt, loaded }
    this.setSensitivity(5);
  }

  setSensitivity(level) {
    const s = Math.min(10, Math.max(1, Number(level) || 5)) / 10; // 0.1 … 1
    this.loadGap = 0.2 + 0.18 * s; // how tight thumb+middle must press
    this.fireGap = 0.75 - 0.2 * s; // how far apart after the flick
    this.reachDrop = 0.93 - 0.1 * s; // middle tip must move this much closer to wrist
    this.windowMs = 140 + 120 * s; // max time between loaded and fired
    this.minCurled = s > 0.75 ? 0 : 1; // folded ring/pinky fingers required
  }

  /**
   * @param {Array<{landmarks: Array, handedness: string}>} hands
   * @param {number} now   timestamp in ms
   * @param {number} aspect frame width / height
   * @returns {boolean} true on the frame a snap completes
   */
  update(hands, now, aspect) {
    let fired = false;
    const seen = new Set();

    for (const { landmarks, handedness } of hands) {
      seen.add(handedness);
      const h = describeHand(landmarks, aspect);
      const track = this.tracks.get(handedness) ?? { loaded: null, loadedAt: -Infinity };

      if (h.gap < this.loadGap && h.curled >= this.minCurled) {
        // Keep refreshing while the fingers stay pressed together.
        track.loaded = h;
        track.loadedAt = now;
      } else if (track.loaded && now - track.loadedAt <= this.windowMs) {
        const from = track.loaded;
        const opened = h.gap > this.fireGap;
        const slammed = h.reach < from.reach * this.reachDrop;
        const travel = dist(h.tip, from.tip) / from.size;
        if (opened && slammed && travel > 0.35) {
          fired = true;
          track.loaded = null;
        }
      } else if (now - track.loadedAt > this.windowMs) {
        track.loaded = null;
      }
      this.tracks.set(handedness, track);
    }

    // A fast flick often blurs the hand out for a frame; keep the loaded state
    // for missing hands until its window runs out.
    for (const [key, track] of this.tracks) {
      if (!seen.has(key) && now - track.loadedAt > this.windowMs) this.tracks.delete(key);
    }
    return fired;
  }
}
