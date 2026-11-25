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
  async function loadPrefs() {
    try {
      const stored = await chrome.storage.sync.get(PREF_DEFAULTS);
      return { ...PREF_DEFAULTS, ...stored };
    } catch {
      return { ...PREF_DEFAULTS };
    }
  }
  function savePrefs(patch) {
    return chrome.storage.sync.set(patch);
  }
  var MSG = Object.freeze({
    TOGGLE: "snapvanish/toggle",
    STATUS: "snapvanish/status",
    INPAINT: "snapvanish/inpaint",
    WAKE_INPAINTER: "snapvanish/wake-inpainter"
  });

  // src/popup/popup.js
  var $ = (id) => document.getElementById(id);
  var prefs;
  var describe = {
    sensitivity: (v) => `${v}/10`,
    dustSeconds: (v) => `${Number(v).toFixed(1)} s`
  };
  function bindRange(key) {
    const input = $(key);
    const out = $(`${key}Out`);
    input.value = prefs[key];
    out.textContent = describe[key](prefs[key]);
    input.addEventListener("input", () => {
      out.textContent = describe[key](input.value);
      savePrefs({ [key]: Number(input.value) });
    });
  }
  function bindCheck(key, onChange) {
    const input = $(key);
    input.checked = !!prefs[key];
    input.addEventListener("change", () => {
      savePrefs({ [key]: input.checked });
      onChange?.(input.checked);
    });
  }
  function bindDirection() {
    const buttons = [...$("direction").querySelectorAll("button")];
    const mark = (dir) => buttons.forEach((b) => b.setAttribute("aria-checked", String(b.dataset.dir === dir)));
    mark(prefs.direction);
    buttons.forEach(
      (b) => b.addEventListener("click", () => {
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
      return await chrome.tabs.sendMessage(tab.id, { type, reason: "popup" });
    } catch {
      return null;
    }
  }
  var LABELS = {
    present: ["ok", "Ready. Snap your fingers on camera.", "Snap now"],
    dissolving: ["gone", "Turning to dust\u2026", "Bring me back"],
    gone: ["gone", "Vanished. Snap again to come back.", "Bring me back"],
    reforming: ["busy", "Coming back\u2026", "Snap now"]
  };
  function showStatus(s) {
    const box = $("status");
    const btn = $("snapNow");
    box.className = "status";
    if (!prefs.enabled) {
      $("statusText").textContent = "Off. Switch on, then restart your camera.";
      btn.disabled = true;
      return;
    }
    if (!s) {
      $("statusText").textContent = "No meeting camera in this tab yet.";
      btn.disabled = true;
      return;
    }
    if (s.error) {
      box.classList.add("busy");
      $("statusText").textContent = `Model error: ${s.error}`;
      btn.disabled = true;
      return;
    }
    if (!s.ready) {
      box.classList.add("busy");
      $("statusText").textContent = "Loading hand tracking and segmentation\u2026";
      btn.disabled = true;
      return;
    }
    const [cls, text, label] = LABELS[s.state] || LABELS.present;
    box.classList.add(cls);
    let extra = "";
    if (s.state === "present") {
      extra = s.aiFill === "ready" ? " Room fill ready." : " Learning your room\u2026";
      if (prefs.confirmWithSound && !s.listening) extra += " (No mic yet: gesture only.)";
    }
    $("statusText").textContent = text + extra;
    $("snapLabel").textContent = label;
    btn.disabled = false;
  }
  async function refresh() {
    showStatus(await ask(MSG.STATUS));
  }
  async function showShortcut() {
    const cmds = await chrome.commands.getAll();
    const cmd = cmds.find((c) => c.name === "snap-toggle");
    $("shortcut").textContent = cmd?.shortcut || "not set";
  }
  (async function init() {
    prefs = await loadPrefs();
    bindCheck("enabled", (on) => {
      prefs.enabled = on;
      refresh();
    });
    bindRange("sensitivity");
    bindRange("dustSeconds");
    bindDirection();
    bindCheck("confirmWithSound", (on) => prefs.confirmWithSound = on);
    bindCheck("muteMic");
    $("snapNow").addEventListener("click", async () => {
      showStatus(await ask(MSG.TOGGLE));
    });
    $("editShortcut").addEventListener("click", (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
    });
    showShortcut();
    refresh();
    setInterval(refresh, 700);
  })();
})();
