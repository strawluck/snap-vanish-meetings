# Thanos Snap Vanish for Meetings

A Chrome extension for Google Meet. Snap your fingers on camera and you turn to dust like Thanos. The other people in the call see an empty room where you were sitting, and your mic mutes. Snap again and you come back.

Everything runs on your own computer. Your video isn't sent anywhere.

## Features

- Detects a real finger snap by listening for the snap's click and checking that your hand is up in snap position on camera. Typing, talking, claps with your hands down and other normal noises won't set it off.
- The popup shows live checks ("Ready to snap", "Snap heard") so you can see what it's picking up while you practice.
- You break apart into dust that blows away, and the dust flies back when you return.
- Shows an actual empty room where you were, not a blurry outline. You can take a quick photo of your empty room for a perfect result, or skip that and let AI fill in the background behind you.
- Your mic mutes when you disappear and unmutes when you come back.
- If you don't want to snap, there's a "Snap now" button and a keyboard shortcut (Alt+Shift+S).
- You can change the snap sensitivity, how long the dust takes, and which way it blows.

## What it works with

Right now it only supports **Google Meet** in **Google Chrome** (version 116 or newer).

- Teams and Zoom on the web aren't supported yet. There's some early code for them, but it hasn't been tested.
- The desktop apps for Meet, Teams and Zoom can't work with it, because browser extensions only run inside the browser.
- Edge, Brave and Arc are built on the same engine as Chrome and should work, but I haven't tested them. Safari and Firefox won't work.
- You need a webcam. A microphone is recommended for the snap sound check.
- It runs on Windows, Mac, Linux and Chromebooks. Most laptops from the last few years are fast enough.

## Installing it

1. Click the green **Code** button on this page, choose **Download ZIP**, and unzip it. (You can also download `snap-vanish-meetings.zip` from **Releases** on the right.)
2. In Chrome, go to `chrome://extensions`.
3. Turn on **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the `extension` folder inside the folder you unzipped. If you used the Releases zip, select the unzipped folder itself. Either way, it's the folder that has `manifest.json` in it.
5. Click the puzzle piece icon in Chrome's toolbar and pin **Snap Vanish** so it's easy to find.

To update it later, replace the folder with the new version and click the reload button on the extension in `chrome://extensions`.

## Using it

1. Open the extension and make sure the switch at the top is on.
2. Join your Google Meet call. If the Meet tab was already open before you installed the extension, refresh it.
3. Capture your empty room. You have two options:
   - **Best: capture your empty room.** At the top of the popup, click **Capture empty room**, then step out of the camera's view. After a 5 second countdown it saves a picture of your empty room, and that's what people see when you vanish. It's easiest to do this on Meet's "Ready to join?" screen before you enter the call, because the countdown shows on your video. You only need to do it once per room. Retake it if you move your camera or the lighting changes.
   - **No setup: AI fill.** Skip the capture, sit in front of the camera for 5 to 10 seconds and lean left and right a bit. It learns the room behind you as you move, and AI fills in the spots it never saw. This is quicker but not as clean, so you may see some smudges where you were sitting.
4. Hold your hand up in front of the camera, around face height, so the camera can see all of it. Put your thumb and middle finger together and fold your ring and pinky fingers in. The popup should say **✋ Ready to snap**.
5. Snap. You need an actual audible snap: the popup flashes **🔊 Snap heard** when the mic catches it.
6. Snap again to come back.

If your snap isn't picked up, open the popup while you try and watch the two checks:

- **"✋ Hand seen" but never "Ready to snap":** bring your hand closer or higher, and press your thumb and middle finger together firmly before snapping. Raising the sensitivity makes this looser.
- **"🔊 Snap heard" doesn't light up:** snap louder or closer to your laptop, or raise the sensitivity. If it says "Mic not available", allow microphone access for Meet.
- **Both light up but nothing happens:** make sure you're on the camera in Meet, not a different tab, and that the popup isn't still loading.

You can turn off **Confirm with snap sound** to rely on the camera alone, but that only works if the camera catches the flick itself, which is much less reliable. The "Snap now" button and Alt+Shift+S always work. To change the shortcut, go to `chrome://extensions/shortcuts`.

### Settings

<img src="docs/popup.png" alt="The Snap Vanish popup" width="260" align="right">

- **On/off switch:** turns the extension on or off. After you change it, turn your camera off and on in Meet (or refresh) for it to apply.
- **Snap now:** disappear or come back right away.
- **Snap sensitivity:** lower means fewer accidental triggers, higher catches softer snaps.
- **Dust duration:** how long the dust effect takes, from 1 to 6 seconds.
- **Dust direction:** left, up, right or random. This is the direction other people see. Your own preview in Meet is mirrored, so "right" will look like left to you.
- **Confirm with snap sound:** listens for the snap's click on the mic (recommended). With it off, the camera has to catch the flick on its own, which misses a lot of snaps.
- **Mute mic while vanished:** mutes you while you're gone.
- **Empty room:** capture a photo of your empty room, see a preview of it, and retake or remove it. The label shows "Photo ✓" when it's using your photo, or "AI fill" when it isn't.

<br clear="right">

### Tips

- Even lighting works best. A bright window behind you makes the empty room harder to fake.
- The empty room is a still picture, so if someone walks behind your chair while you're gone, they won't show up.
- With a room photo, take it in the same lighting you'll have during the call.

## How it works

Normally Google Meet reads your webcam directly. This extension sits in between. It takes your camera feed, changes each frame, and passes the changed video on to Meet. Meet just sends whatever it gets, so everyone in the call sees the edited version.

To catch a snap, it uses two things together. A hand tracking model from Google (MediaPipe) finds the points on your fingers about 30 times a second and notices when your hand is up with your thumb and middle finger pressed together, ready to snap. At the same time it listens to the microphone for the snap's sound: a very short, sharp click that's mostly high-pitched and fades within a few hundredths of a second. Speech, music and a fan humming don't look like that. If it hears that click while your hand was in snap position, it counts as a snap.

The sound is what catches the exact moment, because the finger flick is faster than a single webcam frame. The hand check is what stops random noises from triggering it. Meet filters out clicks like this from your mic to reduce background noise, so the extension opens its own copy of the microphone with that filtering turned off. It only checks the sound for clicks and never records or sends it anywhere.

To make you disappear, a second model works out which part of the picture is you and which part is the room. If you took a room photo, it simply shows that photo while you're gone. If not, it builds its own picture of the room while you're on camera, adding to it whenever you move and uncover more of the wall behind you. It only adds spots that have been clearly empty for a moment, so a fast-moving arm doesn't get baked in. The spots it has never seen, like the chair right behind you, get filled in by a third model called MI-GAN. It works like the "remove object" tool in a photo editor.

When you snap, each part of you turns into specks of dust that fall off in patches, turn grey, and drift away, with the empty room showing behind them. The part of you that hasn't turned to dust yet is always your live camera, so you keep moving naturally while you dissolve. Coming back plays the same animation in reverse: the dust flies back to wherever you are now, and you reassemble as you look at that moment, not frozen in the pose you snapped in. Your mic is switched off while you're gone and back on when you return.

All three models are included in the extension, so nothing gets downloaded during a call and nothing gets uploaded.

### For developers

| Part | What it uses |
|---|---|
| Hand tracking | MediaPipe Hand Landmarker (WebGL, falls back to CPU) |
| Cutting you out | MediaPipe Selfie Segmenter |
| Filling the room | MI-GAN (ONNX) on ONNX Runtime Web, in an offscreen extension page |
| Snap sound | High-pass transient detector (fast attack, under 70 ms decay) on a separate mic stream with noise suppression, echo cancellation and auto gain turned off |
| Camera swap | A `getUserMedia` hook feeding a canvas, sent to Meet with `canvas.captureStream()` |
| Dust | A particle system drawn straight into pixel buffers, written so it can run backwards |
| Packaging | Chrome Manifest V3, bundled with esbuild |

Project layout:

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

The `extension` folder already has everything built. If you change the code, you'll need [Node.js](https://nodejs.org) 18 or newer:

```bash
npm install
npm run build      # rebuilds the extension from src/
npm test           # runs the snap detection tests
npm run package    # makes snap-vanish-meetings.zip
```

## Troubleshooting

**The popup says "No meeting camera in this tab yet."** Refresh the Meet tab and turn your camera on.

**It's stuck on "Loading".** Give it 5 to 10 seconds after your camera turns on. Older computers take a bit longer the first time.

**My snap isn't detected.** See the "If your snap isn't picked up" steps above. The two checks in the popup tell you whether the camera or the mic is the problem.

**It goes off when I don't want it to.** Lower the sensitivity and keep "Confirm with snap sound" on.

**I can still see a faded or blurry version of myself.** Click **Capture empty room** in the popup. That replaces the AI fill with a real picture of your empty room. Without a photo, lean around for a few seconds before snapping so it can see more of the room.

**Meet still shows my mic as on while I'm gone.** That's expected. The extension silences your audio before it reaches Meet, so nobody hears you, but Meet's mic icon doesn't change.

**The keyboard shortcut doesn't work.** Another app might be using it. Pick a different one at `chrome://extensions/shortcuts`.

**My camera looks normal and nothing happens.** Check that the extension is switched on, then turn your camera off and on again in Meet.

## Privacy

Your video, audio and images never leave your computer. There are no accounts, no analytics and no tracking, and the extension doesn't make any network requests. The only things it saves are your settings and, if you take one, your room photo. Both stay in Chrome's storage on your computer, and you can delete the photo from the popup.

It only runs on meeting sites: `meet.google.com`, plus the Teams and Zoom web addresses for the early support mentioned above. It can't see any other site you visit.

## Known limitations

- Only Google Meet is supported for now.
- Meet's own mute icon doesn't change while you're vanished, even though your audio is off.
- If the Meet tab was open before you installed the extension, you have to refresh it.
- On slower computers, the video can get a little choppy while the effect is running.

## Plans

- Support for Teams and Zoom on the web
- Show Meet's mute icon as muted while you're gone
- More effects
- Publish it on the Chrome Web Store

## Credits and license

MIT license, see [LICENSE](LICENSE). It includes open source models and libraries from Google MediaPipe (Apache 2.0), Microsoft ONNX Runtime (MIT) and Picsart's MI-GAN (MIT). Details are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

This is a fan project made for fun. It isn't connected to Marvel, Disney, Google, Microsoft or Zoom. Thanos is a trademark of Marvel.
