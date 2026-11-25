// User preferences, stored in chrome.storage.sync so they follow the profile.
export const PREF_DEFAULTS = Object.freeze({
  enabled: true,
  sensitivity: 5, // 1 (strict) … 10 (loose)
  dustSeconds: 3, // length of the dissolve
  direction: 'right', // right | left | up | random  (as other people see you)
  confirmWithSound: true, // require the snap "click" on the mic
  muteMic: true, // mute while vanished
});

export async function loadPrefs() {
  try {
    const stored = await chrome.storage.sync.get(PREF_DEFAULTS);
    return { ...PREF_DEFAULTS, ...stored };
  } catch {
    return { ...PREF_DEFAULTS };
  }
}

export function savePrefs(patch) {
  return chrome.storage.sync.set(patch);
}

export function watchPrefs(onChange) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;
    const patch = {};
    for (const [key, { newValue }] of Object.entries(changes)) {
      if (key in PREF_DEFAULTS) patch[key] = newValue;
    }
    if (Object.keys(patch).length) onChange(patch);
  });
}

export const MSG = Object.freeze({
  TOGGLE: 'snapvanish/toggle',
  STATUS: 'snapvanish/status',
  ROOM_PHOTO: 'snapvanish/room-photo',
  ROOM_PHOTO_CLEAR: 'snapvanish/room-photo-clear',
  INPAINT: 'snapvanish/inpaint',
  WAKE_INPAINTER: 'snapvanish/wake-inpainter',
});
