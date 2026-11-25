// node test/snap-gesture.test.mjs — sanity checks for the snap recogniser.
import assert from 'node:assert/strict';
import { SnapGesture } from '../src/content/snap-gesture.js';

function hand({ thumbTip, middleTip, curled = true }) {
  const p = Array.from({ length: 21 }, () => ({ x: 0.5, y: 0.6 }));
  p[0] = { x: 0.5, y: 0.8 }; // wrist
  p[9] = { x: 0.5, y: 0.6 }; // middle MCP  → hand size 0.2
  p[13] = { x: 0.53, y: 0.61 };
  p[17] = { x: 0.56, y: 0.63 };
  p[4] = thumbTip;
  p[12] = middleTip;
  p[16] = curled ? { x: 0.52, y: 0.7 } : { x: 0.55, y: 0.38 };
  p[20] = curled ? { x: 0.54, y: 0.71 } : { x: 0.6, y: 0.42 };
  return [{ landmarks: p, handedness: 'Right' }];
}
const loaded = hand({ thumbTip: { x: 0.56, y: 0.45 }, middleTip: { x: 0.57, y: 0.45 } });
const fired = hand({ thumbTip: { x: 0.56, y: 0.45 }, middleTip: { x: 0.47, y: 0.68 } });
const run = (frames, dt = 33) => {
  const g = new SnapGesture();
  return frames.some((f, i) => g.update(f, 1000 + i * dt, 1));
};

assert.equal(run([loaded, loaded, fired]), true, 'a real snap fires');
assert.equal(run([loaded, loaded, [], fired]), true, 'one blurred frame mid-snap still fires');
assert.equal(run([loaded, ...Array(20).fill([]), fired]), false, 'too slow: no fire');
assert.equal(run([loaded, loaded, fired], 400), false, 'slow pinch release: no fire');
const flat = hand({ thumbTip: { x: 0.56, y: 0.45 }, middleTip: { x: 0.57, y: 0.45 }, curled: false });
const flatFired = hand({ thumbTip: { x: 0.56, y: 0.45 }, middleTip: { x: 0.47, y: 0.68 }, curled: false });
assert.equal(run([flat, flat, flatFired]), false, 'open hand pinch (not snap pose): no fire');
const typing = [0, 1, 2, 3, 4, 5].map((i) =>
  hand({ thumbTip: { x: 0.4, y: 0.62 }, middleTip: { x: 0.55, y: 0.4 + (i % 2) * 0.05 }, curled: false })
);
assert.equal(run(typing), false, 'typing-like motion: no fire');
console.log('snap-gesture: all checks passed');

// Ready position (used with the snap sound): thumb + middle together, hand raised.
{
  const g = new SnapGesture();
  g.update(loaded, 1000, 1);
  assert.equal(g.readyAt, 1000, 'loaded hand marks ready');
  const g2 = new SnapGesture();
  g2.update(typing[0], 1000, 1);
  assert.equal(g2.readyAt, -Infinity, 'typing hand is not ready');
  console.log('snap-gesture: ready checks passed');
}
