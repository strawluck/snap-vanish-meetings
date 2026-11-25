// node test/snap-sound.test.mjs — checks the snap sound detector on synthetic audio.
import assert from 'node:assert/strict';
import { SnapSound } from '../src/content/snap-sound.js';

const RATE = 48000;
let seed = 1;
const noise = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;

function render(seconds, addEvent) {
  const out = new Float32Array(Math.round(seconds * RATE));
  for (let i = 0; i < out.length; i++) out[i] = noise() * 0.002; // quiet room
  addEvent(out);
  return out;
}
function detect(samples, sensitivity = 5) {
  const d = new SnapSound(RATE);
  d.setSensitivity(sensitivity);
  const hits = [];
  for (let i = 0; i < samples.length; i += 1024) {
    const chunk = samples.subarray(i, i + 1024);
    const end = (i + chunk.length) / RATE;
    for (const off of d.push(chunk)) hits.push(end + off);
  }
  return hits;
}
const at = (t) => Math.round(t * RATE);

// A snap: a sharp broadband crack that decays in ~10 ms.
const snap = render(2, (o) => {
  for (let i = 0; i < at(0.05); i++) o[at(1) + i] += noise() * 0.35 * Math.exp(-i / at(0.008));
});
const hits = detect(snap);
assert.equal(hits.length, 1, `one snap detected (got ${hits.length})`);
assert.ok(Math.abs(hits[0] - 1) < 0.03, `timed correctly (${hits[0].toFixed(3)}s)`);

// A quieter snap from across the desk still counts at default sensitivity.
const soft = render(2, (o) => {
  for (let i = 0; i < at(0.05); i++) o[at(1) + i] += noise() * 0.06 * Math.exp(-i / at(0.008));
});
assert.equal(detect(soft).length, 1, 'softer snap detected');

// Speech-like: low harmonic tone with a soft attack, half a second long.
const speech = render(2, (o) => {
  for (let i = 0; i < at(0.5); i++) {
    const env = Math.min(1, i / at(0.03));
    const t = i / RATE;
    o[at(0.8) + i] += env * 0.25 * (Math.sin(2 * Math.PI * 180 * t) + 0.5 * Math.sin(2 * Math.PI * 360 * t));
  }
});
assert.equal(detect(speech).length, 0, 'speech ignored');

// A fan switching on: sudden but it keeps going.
const fan = render(2, (o) => {
  for (let i = at(1); i < o.length; i++) o[i] += noise() * 0.08;
});
assert.equal(detect(fan).length, 0, 'sustained noise ignored');

// A very faint tap.
const tap = render(2, (o) => {
  for (let i = 0; i < at(0.03); i++) o[at(1) + i] += noise() * 0.004 * Math.exp(-i / at(0.005));
});
assert.equal(detect(tap).length, 0, 'faint tap ignored');

// Two snaps a second apart are both heard.
const two = render(3, (o) => {
  for (const s of [1, 2]) for (let i = 0; i < at(0.05); i++) o[at(s) + i] += noise() * 0.3 * Math.exp(-i / at(0.008));
});
assert.equal(detect(two).length, 2, 'two snaps heard');

console.log('snap-sound: all checks passed');
