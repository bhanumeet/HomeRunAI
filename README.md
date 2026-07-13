# HomerunAI Director (the "brain")

Native desktop app that ingests several camera feeds, runs the
[RF-DETR SoccerNet](https://huggingface.co/julianzu9612/RFDETR-Soccernet) ball
detector on each one, and automatically switches the **live program** to
whichever camera currently sees the ball with the highest confidence.

This is the AI director console only — phones are just dumb video sources
(RTSP/RTMP over local Wi-Fi). No ML runs on the phones.

```
phones ──RTSP──▶ MediaMTX ──▶ Director (this app)
                               ├─ camera.py    ingest (latest-frame, real-time)
                               ├─ detector.py  RF-DETR → best ball per frame
                               ├─ director.py  pick max-confidence cam (+ smoothing)
                               ├─ engine.py    inference thread + shared state
                               └─ ui/          Qt multiview + LIVE program view
```

Display runs at ~30 fps (smooth video) while inference runs as fast as the
hardware allows on a separate thread — slow detection never stutters the video.

## Setup

Requires **Python 3.11** (PyTorch/rfdetr have no 3.14 wheels yet).

```bash
./setup.sh
source .venv/bin/activate
```

## Run

**Preview the UI now** (no model needed — video + console only):
```bash
python -m app.main --no-model
```

**Full AI director:**
```bash
python download_model.py     # ~1.5 GB checkpoint → weights/
python -m app.main
```

## Camera sources

Edit `config.yaml`. Each camera's `source` is either:

- a **video file** for testing — drop clips in `samples/` (they loop), or
- a **live stream URL** from phones, e.g. `rtsp://127.0.0.1:8554/cam1`.

### Wiring up phones (local Wi-Fi)

Everything's pre-configured. Two terminals:

**Terminal 1 — start the media router** (prints the exact URLs to use):
```bash
./start_streaming.sh
```

**Terminal 2 — start the director** (live config):
```bash
source .venv/bin/activate
python -m app.main --config config.live.yaml
```

**On each phone:**
1. Same Wi-Fi as the laptop.
2. Install an RTMP/RTSP publisher — **Larix Broadcaster** (free, iOS + Android).
3. Set the connection URL to `rtmp://<laptop-ip>:1935/cam1` (use a different
   `camN` per phone — `start_streaming.sh` prints your laptop IP and all URLs).
4. Hit "Go Live". The tile flips from "waiting for stream…" to live video, and
   the AI starts scoring the ball on it.

Cameras you haven't connected show "waiting for stream…" — connect 1 phone or 4,
it works either way. No custom phone app needed yet; the brain is validated first.

## Tuning the switch

`config.yaml → switching`:

- `min_confidence` — cameras below this aren't eligible (no ball → not shown).
- `margin` — a challenger must beat the live cam's confidence by this much.
- `hold_seconds` — …and stay ahead this long before we cut (anti-flicker).

## Notes / current limits

- Detection is **ball-only** for now (`goal/penalty/foul` are temporal events,
  a later phase). The `Director` is structured so priority weighting drops in.
- **Model loading:** this checkpoint is the *original* RF-DETR "Large"
  architecture (DINOv2-windowed-base backbone, resolution 560). The model
  author's `inference.py` uses `RFDETRBase()`, which does **not** load it in
  current `rfdetr` (shape mismatch). We load it with `RFDETRLargeDeprecated`,
  which matches the checkpoint exactly (0 shape mismatches). See `detector.py`.
- **Speed:** on Apple-Silicon CPU each frame is ~0.4 s (~2.6 fps), so with 4
  cameras the *switching decision* updates ~0.6×/sec. Video display stays at
  30 fps regardless. A CUDA GPU is the path to real-time; set `model.device`.
- `infer_width: 0` (native res) gives the best ball detection — the model
  resizes to 560 internally, so pre-downscaling only loses small-ball detail.
