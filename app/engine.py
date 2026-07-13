"""Inference engine thread.

Runs RF-DETR over every camera's latest frame as fast as the hardware allows and
publishes shared state (per-camera ball confidence + which camera is live). The
UI reads this state on its own timer, so slow inference never stutters the video.
"""
from __future__ import annotations

import threading
import time

from .camera import Camera
from .detector import BallDetection, SoccerDetector
from .director import Director


class EngineState:
    """Thread-safe snapshot the UI reads each render tick."""

    def __init__(self):
        self._lock = threading.Lock()
        self.scores: dict[str, float] = {}
        self.balls: dict[str, BallDetection | None] = {}
        self.live: str | None = None
        self.reason: str = ""
        self.infer_fps: float = 0.0

    def publish(self, scores, balls, live, reason, infer_fps):
        with self._lock:
            self.scores = scores
            self.balls = balls
            self.live = live
            self.reason = reason
            self.infer_fps = infer_fps

    def snapshot(self):
        with self._lock:
            return dict(self.scores), dict(self.balls), self.live, self.reason, self.infer_fps


class Engine:
    def __init__(self, cameras: list[Camera], detector: SoccerDetector, director: Director):
        self.cameras = cameras
        self.detector = detector
        self.director = director
        self.state = EngineState()
        self._stop = threading.Event()
        self._thread = threading.Thread(target=self._loop, name="engine", daemon=True)

    def start(self):
        for cam in self.cameras:
            cam.start()
        self._thread.start()
        return self

    def stop(self):
        self._stop.set()
        for cam in self.cameras:
            cam.stop()

    def _loop(self):
        ema_fps = 0.0  # per-frame inference throughput (frames/sec across all cams)
        while not self._stop.is_set():
            scores: dict[str, float] = {}
            balls: dict[str, BallDetection | None] = {}
            frames_done = 0
            detect_time = 0.0

            for cam in self.cameras:
                frame = cam.read()
                if frame is None:
                    scores[cam.id] = 0.0
                    balls[cam.id] = None
                    continue
                try:
                    t = time.monotonic()
                    ball = self.detector.best_ball(frame)
                    detect_time += time.monotonic() - t
                    frames_done += 1
                except Exception as e:  # keep the director alive if one frame fails
                    print(f"[engine] detect error on {cam.id}: {e}")
                    ball = None
                balls[cam.id] = ball
                scores[cam.id] = ball.confidence if ball else 0.0

            live = self.director.update(scores, time.monotonic())

            if frames_done and detect_time > 0:
                inst = frames_done / detect_time
                ema_fps = inst if ema_fps == 0 else (0.7 * ema_fps + 0.3 * inst)
            self.state.publish(scores, balls, live, self.director.last_reason, ema_fps)

            if frames_done == 0:
                time.sleep(0.1)  # cameras haven't decoded yet; don't spin
