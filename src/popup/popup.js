import { loadPrefs, savePrefs, MSG } from '../shared/prefs.js';

const $ = (id) => document.getElementById(id);
let prefs;

const describe = {
  sensitivity: (v) => `${v}/10`,
  dustSeconds: (v) => `${Number(v).toFixed(1)} s`,
};

function bindRange(key) {
  const input = $(key);
  const out = $(`${key}Out`);
  input.value = prefs[key];
  out.textContent = describe[key](prefs[key]);
  input.addEventListener('input', () => {
    out.textContent = describe[key](input.value);
    savePrefs({ [key]: Number(input.value) });
  });
}

function bindCheck(key, onChange) {
  const input = $(key);
  input.checked = !!prefs[key];
  input.addEventListener('change', () => {
    savePrefs({ [key]: input.checked });
    onChange?.(input.checked);
  });
}

function bindDirection() {
  const buttons = [...$('direction').querySelectorAll('button')];
  const mark = (dir) =>
    buttons.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.dir === dir)));
  mark(prefs.direction);
  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      mark(b.dataset.dir);
      savePrefs({ direction: b.dataset.dir });
    })
  );
}

async function activeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function ask(type) {
  const tab = await activeTab();
  if (!tab?.id) return null;
  try {
    return await chrome.tabs.sendMessage(tab.id, { type, reason: 'popup' });
  } catch {
    return null;
  }
}

const LABELS = {
  present: ['ok', 'Ready. Snap your fingers on camera.', 'Snap now'],
  dissolving: ['gone', 'Turning to dust…', 'Bring me back'],
  gone: ['gone', 'Vanished. Snap again to come back.', 'Bring me back'],
  reforming: ['busy', 'Coming back…', 'Snap now'],
};

function showStatus(s) {
  const box = $('status');
  const btn = $('snapNow');
  box.className = 'status';
  if (!prefs.enabled) {
    $('statusText').textContent = 'Off. Switch on, then restart your camera.';
    btn.disabled = true;
    return;
  }
  if (!s) {
    $('statusText').textContent = 'No meeting camera in this tab yet.';
    btn.disabled = true;
    return;
  }
  if (s.error) {
    box.classList.add('busy');
    $('statusText').textContent = `Model error: ${s.error}`;
    btn.disabled = true;
    return;
  }
  if (!s.ready) {
    box.classList.add('busy');
    $('statusText').textContent = 'Loading hand tracking and segmentation…';
    btn.disabled = true;
    return;
  }
  const [cls, text, label] = LABELS[s.state] || LABELS.present;
  box.classList.add(cls);
  let extra = '';
  if (s.state === 'present') {
    extra = s.aiFill === 'ready' ? ' Room fill ready.' : ' Learning your room…';
    if (prefs.confirmWithSound && !s.listening) extra += ' (No mic yet: gesture only.)';
  }
  $('statusText').textContent = text + extra;
  $('snapLabel').textContent = label;
  btn.disabled = false;
}

function showRoom(s) {
  const busy = s?.photo?.countdown !== undefined;
  const canShoot = !!s?.ready && s.state === 'present' && !busy;
  const hasPhoto = !!(s ? s.roomPhoto : savedThumb);
  $('takePhoto').disabled = !canShoot;
  $('retakePhoto').disabled = !canShoot;
  $('takePhoto').hidden = hasPhoto;
  $('roomPhotoRow').hidden = !hasPhoto || !savedThumb;
  $('roomMode').textContent = !s ? '' : hasPhoto ? 'Photo ✓' : 'AI fill';

  const note = $('roomNote');
  if (busy) note.textContent = `Step out of view… ${s.photo.countdown}`;
  else if (s?.photo?.message) note.textContent = s.photo.message;
  else if (hasPhoto) note.textContent = 'Shown when you vanish. Retake it if you move your camera or the lighting changes.';
  else if (!s) note.textContent = 'Open your Meet call first, then capture your empty room here.';
  else
    note.textContent =
      'Do this first for a clean, sharp room. Click, then step out of the camera’s view until the 5 second countdown ends.';
}

let savedThumb = null;
async function loadThumb() {
  const { roomPhoto } = await chrome.storage.local.get('roomPhoto');
  savedThumb = roomPhoto?.src || null;
  if (savedThumb) $('roomThumb').src = savedThumb;
}
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'roomPhoto' in changes) loadThumb().then(refresh);
});

// Live feedback while practising: what the camera and mic are picking up.
function showSnapCheck(s) {
  const box = $('snapCheck');
  box.hidden = !s?.ready;
  if (box.hidden) return;
  const hand = $('handCheck');
  hand.className = 'pill' + (s.handReady ? ' on' : s.handSeen ? ' warm' : '');
  hand.textContent = s.handReady ? '✋ Ready to snap' : s.handSeen ? '✋ Hand seen' : '✋ No hand';
  const sound = $('soundCheck');
  if (!prefs.confirmWithSound) {
    sound.className = 'pill';
    sound.textContent = '🔇 Sound check off';
  } else if (!s.listening) {
    sound.className = 'pill';
    sound.textContent = '🎤 Mic not available';
  } else if (s.heardAgo !== null && s.heardAgo < 2500) {
    sound.className = 'pill on';
    sound.textContent = '🔊 Snap heard';
  } else {
    sound.className = 'pill warm';
    sound.textContent = '🎤 Listening';
  }
}

async function refresh() {
  const s = await ask(MSG.STATUS);
  showStatus(s);
  showRoom(s);
  showSnapCheck(s);
}

async function showShortcut() {
  const cmds = await chrome.commands.getAll();
  const cmd = cmds.find((c) => c.name === 'snap-toggle');
  $('shortcut').textContent = cmd?.shortcut || 'not set';
}

(async function init() {
  prefs = await loadPrefs();
  bindCheck('enabled', (on) => {
    prefs.enabled = on;
    refresh();
  });
  bindRange('sensitivity');
  bindRange('dustSeconds');
  bindDirection();
  bindCheck('confirmWithSound', (on) => (prefs.confirmWithSound = on));
  bindCheck('muteMic');

  $('snapNow').addEventListener('click', async () => {
    showStatus(await ask(MSG.TOGGLE));
  });
  const shoot = async () => showRoom(await ask(MSG.ROOM_PHOTO));
  $('takePhoto').addEventListener('click', shoot);
  $('retakePhoto').addEventListener('click', shoot);
  $('clearPhoto').addEventListener('click', async () => {
    await chrome.storage.local.remove('roomPhoto');
    showRoom(await ask(MSG.ROOM_PHOTO_CLEAR));
  });
  $('editShortcut').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
  });

  showShortcut();
  await loadThumb();
  refresh();
  setInterval(refresh, 300);
})();
