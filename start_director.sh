#!/usr/bin/env bash
# Opens the AI director window (live phone-streaming mode).
# Run the router first (./start_streaming.sh) or let the one already running stay up.
cd "$(dirname "$0")"
source .venv/bin/activate
exec python -m app.main --config config.live.yaml
