// Bundles src/ into extension/scripts and extension/popup.
// Usage: node build.mjs           (one-off build)
//        node build.mjs --watch   (rebuild on change)
import * as esbuild from 'esbuild';
import { readFile, copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// MediaPipe's Emscripten glue (vision_wasm_internal.js) isn't in the package
// exports and is an ES-module/UMD hybrid. We load it as an ES module with an
// explicit default export so it can be bundled into the content script.
const mediapipeGlue = {
  name: 'mediapipe-wasm-glue',
  setup(build) {
    build.onResolve({ filter: /^mediapipe-wasm-glue$/ }, () => ({
      // Relative path so no local folder names end up in the built file.
      path: 'node_modules/@mediapipe/tasks-vision/wasm/vision_wasm_internal.js',
      namespace: 'mp-glue',
    }));
    build.onLoad({ filter: /.*/, namespace: 'mp-glue' }, async (args) => ({
      // ES modules are strict, so the glue's sloppy-mode block function
      // `custom_dbg` would be invisible; define it up front instead.
      contents:
        'var custom_dbg = (t) => console.debug(t);\n' +
        (await readFile(fileURLToPath(new URL(args.path, import.meta.url)), 'utf8')) +
        '\nexport default ModuleFactory;\n',
      loader: 'js',
    }));
  },
};

const shared = {
  bundle: true,
  format: 'iife',
  target: 'chrome116',
  legalComments: 'none',
  external: ['node:*'], // only reached in Node.js code paths
  logLevel: 'info',
  plugins: [mediapipeGlue],
};

const builds = [
  { entryPoints: ['src/content/main.js'], outfile: 'extension/scripts/content.js' },
  { entryPoints: ['src/background/worker.js'], outfile: 'extension/scripts/background.js' },
  { entryPoints: ['src/popup/popup.js'], outfile: 'extension/popup/popup.js' },
];

// Runtime files that ship as-is (WASM binaries and the ONNX Runtime script).
// onnxruntime-web is pinned to 1.18.0: it still ships the single-threaded
// ort-wasm-simd.wasm that runs without cross-origin isolation.
const RUNTIME = [
  ['node_modules/@mediapipe/tasks-vision/wasm/vision_wasm_internal.wasm', 'extension/wasm/vision_wasm_internal.wasm'],
  ['node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm', 'extension/wasm/ort-wasm-simd.wasm'],
  ['node_modules/onnxruntime-web/dist/ort-wasm.wasm', 'extension/wasm/ort-wasm.wasm'],
  ['node_modules/onnxruntime-web/dist/ort.wasm.min.js', 'extension/vendor/ort.wasm.min.js'],
];
await mkdir('extension/wasm', { recursive: true });
await mkdir('extension/vendor', { recursive: true });
await Promise.all(RUNTIME.map(([from, to]) => copyFile(from, to)));

if (process.argv.includes('--watch')) {
  for (const b of builds) (await esbuild.context({ ...shared, ...b })).watch();
} else {
  await Promise.all(builds.map((b) => esbuild.build({ ...shared, ...b })));
}
