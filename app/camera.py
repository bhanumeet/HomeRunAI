"""Camera ingest.

One background thread per source. Always keeps only the *latest* decoded frame
(buffer size 1) so the director never falls behind real time. Works with RTSP/
RTMP URLs (phones -> MediaMTX) and with local video files for testing.
"""
from __future__ import annotations

import os
import threading
import time

# Pull RTSP over TCP (not UDP): far fewer torn frames / artifacts on Wi-Fi.
# Must be set before OpenCV opens any FFmpeg capture.
os.environ.setdefault("OPENCV_FFMPEG_CAPTURE_OPTIONS", "rtsp_transport;tcp")

import cv2
import numpy as np


class Camera:
    def __init__(self, cam_id: str, name: str, source: str, loop_files: bool = True):
        self.id = cam_id
        self.name = name
        self.source = source
        self.loop_files = loop_files and self._is_file(source)

        self._frame: np.ndarray | None = None
        self._lock = threading.Lock()
        self._connected = False
        self._stop = threading.Event()
        self._thread = threading.Thread(target=self._loop, name=f"cam-{cam_id}", daemon=True)

    @staticmethod
    def _is_device(source) -> bool:
        # An integer (or "0", "1", …) means a local capture device (Mac webcam).
        return isinstance(source, int) or (isinstance(source, str) and source.isdigit())

    @staticmethod
    def _is_file(source: str) -> bool:
        if Camera._is_device(source):
            return False
        return not str(source).lower().startswith(("rtsp://", "rtmp://", "http://", "https://")) \
            and os.path.exists(str(source))

    def start(self) -> "Camera":
        self._thread.start()
        return self

    def stop(self) -> None:
        self._stop.set()

    @property
    def connected(self) -> bool:
        return self._connected

    def read(self) -> np.ndarray | None:
        """Return a copy of the latest frame, or None if nothing decoded yet."""
        with self._lock:
            return None if self._frame is None else self._frame.copy()

    def _open(self) -> cv2.VideoCapture:
        if self._is_device(self.source):
            return cv2.VideoCapture(int(self.source))  # local webcam
        cap = cv2.VideoCapture(self.source, cv2.CAP_FFMPEG)
        try:
            cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)  # stay real-time on live streams
        except Exception:
            pass
        return cap

    def _loop(self) -> None:
        cap = self._open()
        while not self._stop.is_set():
            ok, frame = cap.read()
            if not ok or frame is None:
                self._connected = False
                if self.loop_files:
                    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # restart sample clip
                    continue
                # live stream dropped: back off and reconnect
                cap.release()
                time.sleep(1.0)
                cap = self._open()
                continue

            self._connected = True
            with self._lock:
                self._frame = frame

            if self.loop_files:
                # pace file playback to ~30 fps (live streams self-pace)
                time.sleep(1 / 30)
        cap.release()
