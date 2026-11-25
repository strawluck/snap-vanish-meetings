// Snap Vanish — offscreen inpainter.
// Runs MI-GAN (an image-inpainting GAN, MIT licence) with ONNX Runtime Web on
// the CPU, inside the extension. It receives the half-learned picture of your
// room plus a mask of the parts it has never seen, and paints those parts in.
// Running here keeps the heavy maths off the meeting tab's main thread.
/* global ort */
'use strict';

ort.env.wasm.wasmPaths = chrome.runtime.getURL('wasm/');
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;

let session = null;
function getSession() {
  session ??= ort.InferenceSession.create(chrome.runtime.getURL('models/migan.onnx'), {
    executionProviders: ['wasm'],
    graphOptimizationLevel: 'all',
  });
  return session;
}
getSession(); // warm up as soon as the page opens

async function pixelsOf(dataUrl) {
  const bmp = await createImageBitmap(await (await fetch(dataUrl)).blob());
  const c = new OffscreenCanvas(bmp.width, bmp.height);
  const g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(bmp, 0, 0);
  return g.getImageData(0, 0, bmp.width, bmp.height);
}

async function inpaint({ image, mask }) {
  const [photo, known] = await Promise.all([pixelsOf(image), pixelsOf(mask)]);
  const { width: w, height: h } = photo;
  const n = w * h;
  const rgb = new Uint8Array(3 * n); // planar CHW
  const keep = new Uint8Array(n); // 255 = known, 0 = paint this
  for (let i = 0; i < n; i++) {
    rgb[i] = photo.data[i * 4];
    rgb[n + i] = photo.data[i * 4 + 1];
    rgb[2 * n + i] = photo.data[i * 4 + 2];
    keep[i] = known.data[i * 4] > 127 ? 255 : 0;
  }

  const net = await getSession();
  const out = await net.run({
    image: new ort.Tensor('uint8', rgb, [1, 3, h, w]),
    mask: new ort.Tensor('uint8', keep, [1, 1, h, w]),
  });
  const res = out[net.outputNames[0]].data;

  const result = new ImageData(w, h);
  for (let i = 0; i < n; i++) {
    result.data[i * 4] = res[i];
    result.data[i * 4 + 1] = res[n + i];
    result.data[i * 4 + 2] = res[2 * n + i];
    result.data[i * 4 + 3] = 255;
  }
  const c = new OffscreenCanvas(w, h);
  c.getContext('2d').putImageData(result, 0, 0);
  const blob = await c.convertToBlob({ type: 'image/png' });
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
  if (msg?.type !== 'snapvanish/inpaint' || !msg.forwarded) return false;
  inpaint(msg)
    .then((image) => reply({ ok: true, image }))
    .catch((err) => reply({ ok: false, error: String(err?.message || err) }));
  return true;
});
