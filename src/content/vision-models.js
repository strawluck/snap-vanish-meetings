// Loads MediaPipe's hand tracker and person segmenter from files packed inside
// the extension. The WASM glue is bundled in (instead of letting MediaPipe
// inject a <script> tag), which keeps it working on pages with strict CSP or
// Trusted Types such as Google Meet.
import { HandLandmarker, ImageSegmenter } from '@mediapipe/tasks-vision';
import wasmGlue from 'mediapipe-wasm-glue'; // see build.mjs

const asset = (path) => chrome.runtime.getURL(path);

const FILESET = {
  wasmLoaderPath: '', // empty → MediaPipe skips its own script injection
  wasmBinaryPath: asset('wasm/vision_wasm_internal.wasm'),
};

// MediaPipe reads self.ModuleFactory once per task and then clears it.
async function withGlue(create) {
  self.ModuleFactory = wasmGlue;
  try {
    return await create();
  } finally {
    self.ModuleFactory = undefined;
  }
}

async function tryDelegates(build) {
  try {
    return await withGlue(() => build('GPU'));
  } catch (err) {
    console.info('[Snap Vanish] GPU delegate unavailable, using CPU', err);
    return withGlue(() => build('CPU'));
  }
}

let loading = null;

export function loadVisionModels() {
  loading ??= (async () => {
    const hands = await tryDelegates((delegate) =>
      HandLandmarker.createFromOptions(FILESET, {
        baseOptions: { modelAssetPath: asset('models/hand_landmarker.task'), delegate },
        runningMode: 'VIDEO',
        numHands: 2,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.45,
        minTrackingConfidence: 0.45,
      })
    );
    const people = await tryDelegates((delegate) =>
      ImageSegmenter.createFromOptions(FILESET, {
        baseOptions: { modelAssetPath: asset('models/selfie_segmenter.tflite'), delegate },
        runningMode: 'VIDEO',
        outputConfidenceMasks: true,
        outputCategoryMask: false,
      })
    );
    return { hands, people };
  })();
  return loading;
}
