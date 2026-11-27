# Thanos Snap Vanish for Meetings

**Snap your fingers in a Google Meet call and turn to dust, like Thanos. Snap again to come back.**

While you're gone, everyone else sees an empty room where you were sitting, and your mic is muted. It's a free Chrome extension, and it all runs on your own computer. Your video is never sent anywhere.

**Quick start:** install it → capture your empty room → snap.

---

## Contents

- [Features](#features)
- [What it works with](#what-it-works-with)
- [Install](#install)
- [How to use it](#how-to-use-it)
- [Settings](#settings)
- [Troubleshooting](#troubleshooting)
- [How it works](#how-it-works)
- [Privacy](#privacy)

---

## Features

- **Real snap detection.** It listens for the snap and checks your hand is in snap position, so typing and talking won't set it off.
- **Dust effect.** You break apart and blow away. Snap again and the dust flies back.
- **Empty room.** People see a real, sharp picture of your room, not a blurry outline.
- **Auto-mute.** Your mic turns off while you're gone and back on when you return.
- **Backup buttons.** Don't want to snap? Use the **Snap now** button or press **Alt+Shift+S**.
- **Your choice of style.** Change how sensitive the snap is, how long the dust takes, and which way it blows.
- **Private.** No accounts, no tracking, no uploads.

---

## What it works with

| Where | Status |
|---|---|
| ✅ **Google Meet** in Google Chrome (116 or newer) | Supported |
| 🚧 Teams and Zoom (web versions) | Not yet. Coming later |
| ❌ Meet, Teams or Zoom desktop apps | Can't work. Extensions only run in the browser |
| 🤷 Edge, Brave, Arc | Should work, but not tested |
| ❌ Safari, Firefox | Not supported |

You'll need a **webcam** and a **microphone** (the mic hears your snap). Any recent Windows, Mac, Linux or Chromebook laptop is fine.

---

## Install

It takes about a minute, and you don't need to know how to code.

1. **Download it.** Click the green **Code** button at the top of this page → **Download ZIP**. Unzip the file.
2. **Open Chrome's extensions page.** Type `chrome://extensions` in the address bar and press Enter.
3. **Turn on Developer mode.** It's the switch in the top right corner.
4. **Load it.** Click **Load unpacked** and choose the **`extension`** folder inside the folder you unzipped.
5. **Pin it.** Click the 🧩 puzzle icon in Chrome's toolbar, then the 📌 pin next to **Snap Vanish**.

> **Tip:** If you downloaded `snap-vanish-meetings.zip` from **Releases** instead, choose the unzipped folder itself in step 4. The right folder is always the one with `manifest.json` inside.

**Updating later:** swap in the new folder, then click the ↻ reload button on Snap Vanish in `chrome://extensions`.

---

## How to use it

### 1. Join your call

Open Google Meet. If the Meet tab was already open before you installed the extension, **refresh it** first.

### 2. Capture your empty room (do this once)

This is what people will see when you vanish, so it's worth doing.

1. On Meet's **"Ready to join?"** screen, click the Snap Vanish icon.
2. Click **Capture empty room** at the top.
3. **Step out of the camera's view** until the 5 second countdown ends. You'll see the countdown on your video.
4. A preview of your room appears in the popup. Done!

You only need to redo this if you move your camera or the lighting changes. Click **Retake** to update it.

> **Skipped this step?** It still works. AI fills in the room behind you instead, but it won't look as clean, so you might see smudges where you were sitting.

### 3. Snap to vanish

1. Raise your hand to about **face height** so the camera can see all of it.
2. Press your **thumb and middle finger together** and fold your other fingers in.
3. **Snap!** It needs to be an actual snap the mic can hear.

You turn to dust and your mic mutes.

### 4. Snap to come back

Snap the same way again. The dust flies back and you reappear, and your mic turns back on.

> **Practicing?** Keep the popup open while you snap. It shows two live checks:
> **✋ Ready to snap** (the camera sees your hand in position) and **🔊 Snap heard** (the mic caught it). If one doesn't light up, see [Troubleshooting](#troubleshooting).

---

## Settings

<img src="docs/popup.png" alt="The Snap Vanish popup" width="250" align="right">

| Setting | What it does |
|---|---|
| **On/off switch** | Turns the extension on or off. Turn your camera off and on in Meet afterwards. |
| **Empty room** | Capture, retake or remove your room photo. Shows **Photo ✓** or **AI fill**. |
| **Snap now** | Vanish or come back instantly, no snap needed. |
| **Snap sensitivity** | Lower = fewer accidents. Higher = catches softer snaps. |
| **Dust duration** | How long the dust takes: 1 to 6 seconds. |
| **Dust direction** | Left, up, right or random. This is how *others* see it. Your own preview is mirrored, so "right" looks like left to you. |
| **Confirm with snap sound** | Uses the mic to hear your snap. Keep this on, because without it most snaps get missed. |
| **Mute mic while vanished** | Mutes you while you're gone. |

<br clear="right">

**Change the keyboard shortcut** at `chrome://extensions/shortcuts`.

### Tips for the best effect

- 💡 Steady, even lighting works best. A bright window behind you makes it harder.
- 📸 Capture your room in the same lighting you'll have during the call.
- 🚶 Your empty room is a still photo, so anyone walking behind you while you're gone won't show up.

---

## Troubleshooting

**My snap isn't working.** Open the popup and watch the two checks while you snap:

| What you see | What to try |
|---|---|
| ✋ **Hand seen**, never **Ready to snap** | Raise your hand higher or closer. Press your thumb and middle finger firmly together before snapping. |
| 🔊 **Snap heard** never lights up | Snap louder or closer to your laptop, or raise the sensitivity. |
| 🎤 **Mic not available** | Allow microphone access for Meet in Chrome. |
| Both light up, nothing happens | Make sure the popup has finished loading and you're in the Meet tab. |

You can always use **Snap now** or **Alt+Shift+S** instead.

**I can still see a faded or blurry me.** Click **Capture empty room** in the popup. A real photo of your room fixes this.

**It says "No meeting camera in this tab yet."** Refresh the Meet tab and turn your camera on.

**It's stuck on "Loading".** Give it 5 to 10 seconds after your camera turns on. Older computers take a little longer.

**It goes off by accident.** Lower the sensitivity, and keep **Confirm with snap sound** on.

**Meet still shows my mic as on while I'm gone.** That's normal. Your sound is cut off before it reaches Meet, so nobody can hear you. Meet's own mic icon just doesn't change.

**The shortcut doesn't work.** Another app might be using Alt+Shift+S. Pick a new one at `chrome://extensions/shortcuts`.

**Nothing happens at all.** Check the switch in the popup is on, then turn your camera off and on in Meet.

---

## How it works

**It sits between your camera and Meet.**
Normally Meet reads your webcam directly. This extension takes your camera feed first, edits each frame, and hands the edited video to Meet. Meet just sends what it's given, so everyone sees the edited version.

**It catches your snap with the camera and the mic.**
A hand tracking model from Google finds the points on your fingers about 30 times a second. It notices when your hand is up with your thumb and middle finger together. At the same moment, the mic listens for the snap's sound: a short, sharp, high-pitched click. If it hears that click while your hand is in position, that's a snap.

Why both? A snap is faster than one webcam frame, so the camera alone often misses it. The sound catches the exact moment, and the hand check stops random noises like a clap or a cough from triggering it.

Meet normally filters clicks out of your mic to cut background noise, so the extension listens on its own copy of the mic with that filter off. It only listens for clicks. Nothing is recorded or sent anywhere.

**It knows which part of the picture is you.**
A second model works out which pixels are you and which are the room, like an automatic cut-out tool.

**It shows the empty room.**
If you captured your room, it simply shows that photo. If not, it learns the room behind you as you move around, and a third AI model called MI-GAN fills in the spots it has never seen, like the "remove object" tool in a photo editor.

**It turns you into dust.**
When you snap, pieces of you break off in patches, turn grey and drift away, showing the room behind. The part of you that hasn't turned to dust yet is still your live camera, so you keep moving naturally. Coming back plays the same thing in reverse, and the dust flies back to wherever you are right now.

All three AI models are packed inside the extension. Nothing is downloaded during a call, and nothing is uploaded.

<details>
<summary><b>For developers</b></summary>

<br>

| Part | What it uses |
|---|---|
| Hand tracking | MediaPipe Hand Landmarker (WebGL, falls back to CPU) |
| Cutting you out | MediaPipe Selfie Segmenter |
| Filling the room | MI-GAN (ONNX) on ONNX Runtime Web, in an offscreen extension page |
| Snap sound | High-pass transient detector (fast attack, under 70 ms decay) on a separate mic stream with noise suppression, echo cancellation and auto gain off |
| Camera swap | A `getUserMedia` hook feeding a canvas, sent to Meet with `canvas.captureStream()` |
| Dust | Particle system written straight into pixel buffers; untouched parts drawn from the live camera through a release stencil |
| Packaging | Chrome Manifest V3, bundled with esbuild |

**Project layout**

```
extension/        the folder you load in Chrome
  manifest.json
  scripts/        page-hook.js, plus content.js and background.js (built from src/)
  popup/          the settings popup
  inpainter/      offscreen page that runs MI-GAN
  models/         hand tracking, person cutout and MI-GAN models
  wasm/, vendor/  MediaPipe and ONNX Runtime files
  icons/
src/              source code for the built scripts
test/             snap detection tests
tools/            icon generator and zip script
build.mjs         build script
```

**Building from source**

The `extension` folder is already built. If you change the code, you'll need [Node.js](https://nodejs.org) 18 or newer:

```bash
npm install
npm run build      # rebuilds the extension from src/
npm test           # runs the snap detection tests
npm run package    # makes snap-vanish-meetings.zip
```

</details>

---

## Privacy

- 🔒 Your video, audio and images **never leave your computer**.
- 🚫 No accounts, no analytics, no tracking. The extension makes no network requests.
- 💾 It only saves your settings and your room photo, both in Chrome on your computer. You can remove the photo any time from the popup.
- 🌐 It only runs on meeting sites (`meet.google.com`, plus the Teams and Zoom web addresses for future support). It can't see any other site.

---

## Known limitations

- Only Google Meet for now.
- Meet's mic icon doesn't show as muted while you're gone, even though your sound is off.
- If Meet was open before you installed the extension, you need to refresh it.
- On slower computers, the video can get a bit choppy during the dust effect.

## Coming later

- Teams and Zoom on the web
- Meet's mute icon showing as muted while you're gone
- More effects
- Chrome Web Store release

---

## Credits and license

MIT license, see [LICENSE](LICENSE). Uses open source models and libraries from Google MediaPipe (Apache 2.0), Microsoft ONNX Runtime (MIT) and Picsart's MI-GAN (MIT). Details are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

A fan project made for fun. Not connected to Marvel, Disney, Google, Microsoft or Zoom. Thanos is a trademark of Marvel.
