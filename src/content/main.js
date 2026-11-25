// Snap Vanish — isolated-world content script.
// Receives camera/mic streams from page-hook.js and runs a VanishingAct for
// each camera the meeting opens.
import { loadPrefs, watchPrefs, MSG, PREF_DEFAULTS } from '../shared/prefs.js';
import { VanishingAct } from './vanishing-act.js';
import { ClickEar } from './click-ear.js';
import { MicSwitch } from './mic-switch.js';

let prefs = { ...PREF_DEFAULTS };
const acts = new Set();
const ear = new ClickEar();
const mic = new MicSwitch();

loadPrefs().then((p) => applyPrefs(p));
watchPrefs((patch) => applyPrefs({ ...prefs, ...patch }));

function applyPrefs(next) {
  prefs = next;
  ear.setSensitivity(prefs.sensitivity);
  for (const act of acts) act.setPrefs(prefs);
}

function hearWith(track) {
  if (prefs.confirmWithSound && acts.size && !ear.listening && track.readyState === 'live') {
    ear.listenTo(track);
  }
}

document.addEventListener(
  'snapvanish:port',
  (event) => {
    const port = event.target;
    const holder = port.querySelector('video');
    const stream = holder?.srcObject;
    if (!stream) return;

    for (const t of stream.getAudioTracks()) {
      mic.adopt(t);
      hearWith(t);
    }

    if (event.detail !== 'camera' || !prefs.enabled) return;
    const track = stream.getVideoTracks()[0];
    const output = port.querySelector('canvas');
    if (!track || !output) return;

    const act = new VanishingAct({
      track,
      output,
      prefs,
      ear,
      mic,
      onChange: (closing) => {
        if (closing) acts.delete(closing);
      },
    });
    acts.add(act);
    const meetingMic = mic.live()[0];
    if (meetingMic) hearWith(meetingMic);
    port.setAttribute('data-accepted', '1');
  },
  true
);

// Browsers keep audio suspended until the user interacts with the page.
const wakeAudio = () => ear.ctx?.state === 'suspended' && ear.ctx.resume().catch(() => {});
addEventListener('pointerdown', wakeAudio, true);
addEventListener('keydown', wakeAudio, true);

// Our private mic copy follows the meeting's mic: when the meeting stops or
// switches its microphone, we stop ours (and move to the new one).
setInterval(() => {
  if (ear.origin && ear.origin.readyState === 'ended') ear.stop();
  if (ear.listening && (!acts.size || !prefs.confirmWithSound)) ear.stop();
  if (!ear.listening && acts.size && prefs.confirmWithSound) {
    const next = mic.live().find((t) => t.readyState === 'live');
    if (next) ear.listenTo(next);
  }
}, 1500);

chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
  if (!acts.size) return false; // let a frame that owns the camera answer
  const act = [...acts].at(-1);
  if (msg?.type === MSG.TOGGLE) {
    act.toggle(msg.reason || 'button');
    reply(act.status());
  } else if (msg?.type === MSG.STATUS) {
    reply(act.status());
  } else if (msg?.type === MSG.ROOM_PHOTO) {
    act.startRoomPhoto();
    reply(act.status());
  } else if (msg?.type === MSG.ROOM_PHOTO_CLEAR) {
    act.clearRoomPhoto();
    reply(act.status());
  }
  return false;
});
