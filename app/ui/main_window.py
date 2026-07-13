"""Director console UI (PySide6).

Layout:
  ┌───────────────────────────────────────────┐
  │              LIVE PROGRAM                   │  <- currently selected camera, large
  ├──────────┬──────────┬──────────┬───────────┤
  │  cam1    │  cam2    │  cam3     │  cam4      │  <- multiview, live cam gets red border
  │  [conf]  │  [conf]  │  [conf]   │  [conf]    │
  └──────────┴──────────┴──────────┴───────────┘
  status bar: director reason + inference fps

A QTimer refreshes the video at ~30 fps by pulling each camera's latest frame,
while the engine thread updates confidences/live selection independently.
"""
from __future__ import annotations

import socket
from io import BytesIO
from urllib.parse import urlparse

import cv2
import numpy as np
from PySide6.QtCore import Qt, QTimer
from PySide6.QtGui import QColor, QImage, QPixmap
from PySide6.QtWidgets import (
    QFrame, QGridLayout, QHBoxLayout, QLabel, QMainWindow, QProgressBar,
    QVBoxLayout, QWidget,
)

from ..camera import Camera
from ..detector import BallDetection
from ..engine import Engine

BALL_COLOR = (0, 0, 255)  # BGR red


def get_lan_ip() -> str:
    """Best-effort local Wi-Fi/LAN IP (the address phones connect to)."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))  # no packets sent; just picks the outbound iface
        return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"
    finally:
        s.close()


def publish_url_for(source, lan_ip: str) -> str | None:
    """The RTMP URL a phone should publish to for a MediaMTX-routed camera.
    Returns None for files/webcams/remote sources (nothing to pair)."""
    if not isinstance(source, str):
        return None
    u = urlparse(source)
    if u.scheme not in ("rtsp", "rtmp"):
        return None
    if u.hostname not in ("127.0.0.1", "localhost", "0.0.0.0"):
        return None
    path = u.path.strip("/")
    if not path:
        return None
    return f"rtmp://{lan_ip}:1935/{path}"


def make_qr_pixmap(data: str) -> QPixmap:
    import qrcode

    img = qrcode.make(data, box_size=6, border=3)
    buf = BytesIO()
    img.save(buf)
    pm = QPixmap()
    pm.loadFromData(buf.getvalue())
    return pm


def _to_pixmap(frame_bgr: np.ndarray) -> QPixmap:
    h, w = frame_bgr.shape[:2]
    img = QImage(frame_bgr.data, w, h, 3 * w, QImage.Format_BGR888)
    return QPixmap.fromImage(img.copy())


def _draw_ball(frame_bgr: np.ndarray, ball: BallDetection | None) -> np.ndarray:
    if ball is None:
        return frame_bgr
    out = frame_bgr.copy()
    x1, y1, x2, y2 = (int(v) for v in ball.xyxy)
    cv2.rectangle(out, (x1, y1), (x2, y2), BALL_COLOR, 3)
    cv2.putText(out, f"ball {ball.confidence:.2f}", (x1, max(0, y1 - 8)),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, BALL_COLOR, 2)
    return out


class CameraTile(QFrame):
    def __init__(self, cam_id: str, name: str):
        super().__init__()
        self.cam_id = cam_id
        self._name = name
        self._qr: QPixmap | None = None
        self._publish_url: str | None = None
        self.setObjectName("tile")
        self.video = QLabel(alignment=Qt.AlignCenter)
        self.video.setMinimumSize(320, 180)
        self.video.setStyleSheet("background:#111;")
        self.title = QLabel(name)
        self.title.setStyleSheet("color:#ddd; font-weight:600;")
        self.bar = QProgressBar()
        self.bar.setRange(0, 100)
        self.bar.setTextVisible(True)
        self.bar.setFormat("ball %p%")

        lay = QVBoxLayout(self)
        lay.setContentsMargins(6, 6, 6, 6)
        lay.addWidget(self.video, 1)
        lay.addWidget(self.title)
        lay.addWidget(self.bar)
        self.set_live(False)

    def set_frame(self, frame_bgr: np.ndarray):
        pm = _to_pixmap(frame_bgr).scaled(
            self.video.width(), self.video.height(),
            Qt.KeepAspectRatio, Qt.SmoothTransformation)
        self.video.setPixmap(pm)
        if self.title.text() != self._name:
            self.title.setText(self._name)

    def set_pairing(self, publish_url: str | None):
        """Give this tile the phone-publish URL so it can show a pairing QR."""
        self._publish_url = publish_url
        self._qr = make_qr_pixmap(publish_url) if publish_url else None

    def show_offline(self, msg: str):
        if self._qr is not None:
            # show the pairing QR (its own white quiet-zone makes it scannable)
            side = max(120, self.video.height() - 12)
            self.video.setPixmap(
                self._qr.scaled(side, side, Qt.KeepAspectRatio, Qt.SmoothTransformation)
            )
            self.video.setStyleSheet("background:#111;")
            self.title.setText(f"📱 Scan to connect · {self._name}")
        else:
            self.video.setPixmap(QPixmap())  # clear last frame
            self.video.setText(msg)
            self.video.setStyleSheet("background:#111; color:#888; font-size:13px;")
            self.title.setText(self._name)
        self.bar.setValue(0)

    def set_confidence(self, conf: float):
        self.bar.setValue(int(round(conf * 100)))

    def set_live(self, live: bool):
        self.setStyleSheet(
            "QFrame#tile{border:3px solid %s; border-radius:6px; background:#1b1b1b;}"
            % ("#e02424" if live else "#333")
        )


class MainWindow(QMainWindow):
    def __init__(self, cameras: list[Camera], engine: Engine, fps: int = 30):
        super().__init__()
        self.setWindowTitle("HomerunAI — AI Director")
        self.resize(1280, 860)
        self.cameras = {c.id: c for c in cameras}
        self.engine = engine

        # Pairing: each MediaMTX-routed camera gets a phone-publish URL + QR.
        self._lan_ip = get_lan_ip()
        self._pair_urls = {c.id: publish_url_for(c.source, self._lan_ip) for c in cameras}
        has_pairing = any(self._pair_urls.values())

        root = QWidget()
        self.setCentralWidget(root)
        outer = QVBoxLayout(root)
        outer.setContentsMargins(10, 10, 10, 10)

        # --- LIVE PROGRAM ---
        header = QHBoxLayout()
        self.live_badge = QLabel("● LIVE")
        self.live_badge.setStyleSheet("color:#e02424; font-size:16px; font-weight:800;")
        self.program_name = QLabel("—")
        self.program_name.setStyleSheet("color:#fff; font-size:16px; font-weight:700;")
        header.addWidget(self.live_badge)
        header.addWidget(self.program_name)
        header.addStretch(1)
        if has_pairing:
            hint = QLabel(f"📱 Scan a waiting tile with the HomerunAI Camera app  ·  {self._lan_ip}")
            hint.setStyleSheet("color:#888; font-size:12px;")
            header.addWidget(hint)
        outer.addLayout(header)

        self.program = QLabel(alignment=Qt.AlignCenter)
        self.program.setMinimumHeight(420)
        self.program.setStyleSheet("background:#000; border-radius:8px;")
        outer.addWidget(self.program, 3)

        # --- MULTIVIEW ---
        grid = QGridLayout()
        self.tiles: dict[str, CameraTile] = {}
        for i, cam in enumerate(cameras):
            tile = CameraTile(cam.id, cam.name)
            tile.set_pairing(self._pair_urls.get(cam.id))
            self.tiles[cam.id] = tile
            grid.addWidget(tile, 0, i)
        outer.addLayout(grid, 2)

        # --- STATUS ---
        self.status = self.statusBar()
        self.status.showMessage("starting…")
        root.setStyleSheet("background:#0d0d0d;")

        self.timer = QTimer(self)
        self.timer.timeout.connect(self.refresh)
        self.timer.start(int(1000 / fps))

    def refresh(self):
        scores, balls, live, reason, infer_fps = self.engine.state.snapshot()

        for cam_id, cam in self.cameras.items():
            frame = cam.read()
            tile = self.tiles[cam_id]
            tile.set_live(cam_id == live)
            if frame is None:
                tile.show_offline("● waiting for stream…")
                continue
            tile.set_confidence(scores.get(cam_id, 0.0))
            tile.set_frame(_draw_ball(frame, balls.get(cam_id)))

        if live and live in self.cameras:
            frame = self.cameras[live].read()
            self.program_name.setText(self.cameras[live].name)
            if frame is not None:
                shown = _draw_ball(frame, balls.get(live))
                pm = _to_pixmap(shown).scaled(
                    self.program.width(), self.program.height(),
                    Qt.KeepAspectRatio, Qt.SmoothTransformation)
                self.program.setPixmap(pm)

        self.status.showMessage(f"{reason}    |    inference {infer_fps:.1f} fps")

    def closeEvent(self, event):
        self.engine.stop()
        super().closeEvent(event)
