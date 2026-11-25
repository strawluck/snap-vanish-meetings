// Snap Vanish — page hook (runs in the page's MAIN world at document_start).
//
// The meeting app asks the browser for the camera. We hand it a canvas-backed
// track instead and give the real camera stream to the extension's isolated
// content script, which does all the processing and paints into that canvas.
// Nothing here sends media anywhere; it only re-routes it inside this tab.
(function installSnapVanishHook() {
  'use strict';

  const PORT_EVENT = 'snapvanish:port';
  const proto = window.MediaDevices && MediaDevices.prototype;
  if (!proto || proto.__snapVanishHooked) return;
  Object.defineProperty(proto, '__snapVanishHooked', { value: true });

  const originalGetUserMedia = proto.getUserMedia;

  // Pass DOM nodes to the isolated world. Both worlds share the DOM, so the
  // content script receives the very same <video>/<canvas> elements and can
  // read the MediaStream from video.srcObject. It answers synchronously by
  // setting data-accepted on the port element.
  function offerToExtension(kind, stream, canvas) {
    const port = document.createElement('snap-vanish-port');
    port.hidden = true;
    const holder = document.createElement('video');
    holder.muted = true;
    holder.srcObject = stream;
    port.appendChild(holder);
    if (canvas) port.appendChild(canvas);

    (document.documentElement || document.body).appendChild(port);
    port.dispatchEvent(new CustomEvent(PORT_EVENT, { bubbles: true, detail: kind }));
    const accepted = port.getAttribute('data-accepted') === '1';
    port.remove();
    return accepted;
  }

  function mirrorTrack(fake, real, canvas) {
    const own = (name, fn) =>
      Object.defineProperty(fake, name, { value: fn, configurable: true, writable: true });

    Object.defineProperty(fake, 'label', { get: () => real.label, configurable: true });
    own('getSettings', () => ({
      ...real.getSettings(),
      width: canvas.width,
      height: canvas.height,
    }));
    own('getCapabilities', () => (real.getCapabilities ? real.getCapabilities() : {}));
    own('getConstraints', () => real.getConstraints());
    own('applyConstraints', (c) => real.applyConstraints(c));

    const stopFake = fake.stop.bind(fake);
    own('stop', () => {
      stopFake();
      real.stop();
    });
    real.addEventListener('ended', () => {
      stopFake();
      fake.dispatchEvent(new Event('ended'));
    });
  }

  function swapCamera(stream) {
    const real = stream.getVideoTracks()[0];
    if (!real) return stream;

    const s = real.getSettings();
    const canvas = document.createElement('canvas');
    canvas.width = s.width || 1280;
    canvas.height = s.height || 720;

    if (!offerToExtension('camera', stream, canvas)) return stream; // extension off

    const fake = canvas.captureStream(Math.round(s.frameRate || 30)).getVideoTracks()[0];
    mirrorTrack(fake, real, canvas);
    return new MediaStream([fake, ...stream.getAudioTracks()]);
  }

  async function getUserMediaWithSnap(constraints) {
    const stream = await originalGetUserMedia.call(this, constraints);
    try {
      if (constraints && constraints.video && stream.getVideoTracks().length) {
        return swapCamera(stream);
      }
      if (stream.getAudioTracks().length) offerToExtension('mic', stream, null);
    } catch (err) {
      console.warn('[Snap Vanish] passthrough after error:', err);
    }
    return stream;
  }

  Object.defineProperty(proto, 'getUserMedia', {
    value: getUserMediaWithSnap,
    configurable: true,
    writable: true,
  });
})();
