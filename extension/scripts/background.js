(() => {
  // src/shared/prefs.js
  var PREF_DEFAULTS = Object.freeze({
    enabled: true,
    sensitivity: 5,
    // 1 (strict) … 10 (loose)
    dustSeconds: 3,
    // length of the dissolve
    direction: "right",
    // right | left | up | random  (as other people see you)
    confirmWithSound: true,
    // require the snap "click" on the mic
    muteMic: true
    // mute while vanished
  });
  var MSG = Object.freeze({
    TOGGLE: "snapvanish/toggle",
    STATUS: "snapvanish/status",
    INPAINT: "snapvanish/inpaint",
    WAKE_INPAINTER: "snapvanish/wake-inpainter"
  });

  // src/background/worker.js
  var INPAINTER = "inpainter/inpainter.html";
  var opening = null;
  async function ensureInpainter() {
    const url = chrome.runtime.getURL(INPAINTER);
    const existing = await chrome.runtime.getContexts({
      contextTypes: ["OFFSCREEN_DOCUMENT"],
      documentUrls: [url]
    });
    if (existing.length) return;
    opening ??= chrome.offscreen.createDocument({
      url: INPAINTER,
      reasons: ["WORKERS"],
      justification: "Runs the local AI model that paints the empty room behind you."
    }).finally(() => opening = null);
    await opening;
  }
  async function toggleActiveTab(reason) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (!tab?.id) return null;
    try {
      return await chrome.tabs.sendMessage(tab.id, { type: MSG.TOGGLE, reason });
    } catch {
      return null;
    }
  }
  chrome.commands.onCommand.addListener((command) => {
    if (command === "snap-toggle") toggleActiveTab("shortcut");
  });
  chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
    if (msg?.type === MSG.INPAINT && !msg.forwarded) {
      ensureInpainter().then(() => chrome.runtime.sendMessage({ ...msg, forwarded: true })).then(reply).catch((err) => reply({ ok: false, error: String(err) }));
      return true;
    }
    return false;
  });
})();
