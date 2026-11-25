// Snap Vanish — service worker.
// * keyboard shortcut → toggle in the active tab
// * keeps the offscreen MI-GAN inpainter page alive when a tab needs it
import { MSG } from '../shared/prefs.js';

const INPAINTER = 'inpainter/inpainter.html';
let opening = null;

async function ensureInpainter() {
  const url = chrome.runtime.getURL(INPAINTER);
  const existing = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [url],
  });
  if (existing.length) return;
  opening ??= chrome.offscreen
    .createDocument({
      url: INPAINTER,
      reasons: ['WORKERS'],
      justification: 'Runs the local AI model that paints the empty room behind you.',
    })
    .finally(() => (opening = null));
  await opening;
}

async function toggleActiveTab(reason) {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (!tab?.id) return null;
  try {
    return await chrome.tabs.sendMessage(tab.id, { type: MSG.TOGGLE, reason });
  } catch {
    return null; // no meeting camera in this tab
  }
}

chrome.commands.onCommand.addListener((command) => {
  if (command === 'snap-toggle') toggleActiveTab('shortcut');
});

chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
  if (msg?.type === MSG.INPAINT && !msg.forwarded) {
    // Content scripts talk to us; we make sure the offscreen page exists and
    // hand the job over to it.
    ensureInpainter()
      .then(() => chrome.runtime.sendMessage({ ...msg, forwarded: true }))
      .then(reply)
      .catch((err) => reply({ ok: false, error: String(err) }));
    return true;
  }
  return false;
});
