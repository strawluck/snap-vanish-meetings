# Third-party components

These files are bundled in `extension/` unchanged (or, for scripts, bundled by esbuild).

| Component | Files | Licence | Source |
|---|---|---|---|
| MediaPipe Tasks Vision 1.2.3 | `scripts/content.js` (bundled), `wasm/vision_wasm_internal.wasm` | Apache-2.0 | https://github.com/google-ai-edge/mediapipe |
| MediaPipe Hand Landmarker model | `models/hand_landmarker.task` | Apache-2.0 | https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker |
| MediaPipe Selfie Segmenter model | `models/selfie_segmenter.tflite` | Apache-2.0 | https://ai.google.dev/edge/mediapipe/solutions/vision/image_segmenter |
| ONNX Runtime Web 1.18.0 | `vendor/ort.wasm.min.js`, `wasm/ort-wasm*.wasm` | MIT | https://github.com/microsoft/onnxruntime |
| MI-GAN (pipeline v2 ONNX export) | `models/migan.onnx` | MIT | https://github.com/Picsart-AI-Research/MI-GAN · https://huggingface.co/andraniksargsyan/migan |

The full licence texts are available at the linked sources.
