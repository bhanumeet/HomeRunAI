#!/usr/bin/env bash
# TEMP switching-speed test: cam2 = Mac webcam (default resting shot).
# macOS will ask for camera permission the first time — click Allow.
cd "$(dirname "$0")"
source .venv/bin/activate
exec python -m app.main --config config.test.yaml
