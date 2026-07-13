#!/usr/bin/env bash
# Starts the MediaMTX media router and prints the URLs your phones publish to.
# Leave this running, then in a SECOND terminal run:
#     source .venv/bin/activate && python -m app.main --config config.live.yaml
set -e
cd "$(dirname "$0")"

IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "<laptop-ip>")

cat <<EOF

============================================================
  HomerunAI — phone streaming
============================================================
  Laptop IP: $IP   (phones must be on the SAME Wi-Fi)

  In the phone app (e.g. Larix Broadcaster), set the
  connection URL to ONE of these — a different camN per phone:

    RTMP (easiest):   rtmp://$IP:1935/cam1
                      rtmp://$IP:1935/cam2
                      rtmp://$IP:1935/cam3
                      rtmp://$IP:1935/cam4

    RTSP (alt):       rtsp://$IP:8554/cam1   (…cam2, cam3, cam4)

  Then start the director in another terminal:
    source .venv/bin/activate
    python -m app.main --config config.live.yaml

  Press the phone app's "Go Live" / record button to publish.
  Ctrl+C here stops the router.
============================================================

EOF

exec mediamtx mediamtx.yml
