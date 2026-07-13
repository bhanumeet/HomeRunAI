"""Entry point: python -m app.main [--config config.yaml] [--no-model]

Loads config, wires cameras -> detector -> director -> engine, and shows the UI.
Use --no-model to preview the console/video pipeline before downloading the
1.5 GB checkpoint (all confidences will be 0 and it holds the first camera).
"""
from __future__ import annotations

import argparse
import os
import sys

import yaml
from PySide6.QtWidgets import QApplication

from .camera import Camera
from .director import Director
from .engine import Engine
from .ui.main_window import MainWindow


class NullDetector:
    """Stand-in used with --no-model so the UI runs without the checkpoint."""

    def best_ball(self, frame_bgr):
        return None


def build_detector(cfg, no_model):
    if no_model:
        print("[main] --no-model: using NullDetector (no ball detection)")
        return NullDetector()
    from .detector import SoccerDetector

    m = cfg["model"]
    weights = m["weights"]
    if not os.path.exists(weights):
        sys.exit(
            f"\nModel weights not found at '{weights}'.\n"
            "Download them first:   python download_model.py\n"
            "Or preview the UI without a model:   python -m app.main --no-model\n"
        )
    return SoccerDetector(
        weights=weights,
        device=m.get("device", "auto"),
        ball_threshold=m.get("ball_threshold", 0.4),
        infer_width=m.get("infer_width", 960),
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default="config.yaml")
    ap.add_argument("--no-model", action="store_true")
    args = ap.parse_args()

    with open(args.config) as f:
        cfg = yaml.safe_load(f)

    cameras = [Camera(c["id"], c["name"], c["source"]) for c in cfg["cameras"]]
    detector = build_detector(cfg, args.no_model)

    sw = cfg.get("switching", {})
    director = Director(
        margin=sw.get("margin", 0.08),
        hold_seconds=sw.get("hold_seconds", 0.8),
        min_confidence=sw.get("min_confidence", 0.4),
        default_cam=sw.get("default_cam"),
    )

    engine = Engine(cameras, detector, director).start()

    app = QApplication(sys.argv)
    win = MainWindow(cameras, engine)
    win.show()
    sys.exit(app.exec())


if __name__ == "__main__":
    main()
