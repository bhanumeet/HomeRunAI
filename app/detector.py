"""RF-DETR SoccerNet detector wrapper.

Loads the julianzu9612/RFDETR-Soccernet checkpoint exactly the way the model
author's inference.py does: build RFDETRBase(), reinitialize the detection head
for 4 classes, then load the fine-tuned state dict.

Classes: 0=ball, 1=player, 2=referee, 3=goalkeeper
"""
from __future__ import annotations

from dataclasses import dataclass

import numpy as np
from PIL import Image

CLASS_NAMES = ["ball", "player", "referee", "goalkeeper"]
BALL_CLASS_ID = 0


@dataclass
class BallDetection:
    confidence: float
    xyxy: tuple[float, float, float, float]  # in the coordinates of the frame passed to detect()


def _pick_device(requested: str) -> str:
    import torch

    if requested and requested != "auto":
        return requested
    if torch.cuda.is_available():
        return "cuda"
    # MPS often has gaps for DETR ops; default to CPU on Mac but allow override.
    return "cpu"


class SoccerDetector:
    """Thin wrapper around RF-DETR that returns the highest-confidence ball per frame."""

    def __init__(self, weights: str, device: str = "auto", ball_threshold: float = 0.4,
                 infer_width: int = 960):
        import torch
        # This checkpoint was trained with the original RF-DETR "Large" architecture
        # (DINOv2-windowed-base backbone, resolution 560). Its state dict matches
        # RFDETRLargeDeprecated *exactly* (0 shape mismatches); the current
        # RFDETRBase/RFDETRLarge use different backbones and will not load it.
        from rfdetr import RFDETRLargeDeprecated

        self.device = _pick_device(device)
        self.ball_threshold = float(ball_threshold)
        self.infer_width = int(infer_width)

        print(f"[detector] loading RF-DETR ({self.device}) from {weights} ...")
        try:
            self.model = RFDETRLargeDeprecated(device=self.device)
        except TypeError:
            # older rfdetr signatures don't accept device= in the constructor
            self.model = RFDETRLargeDeprecated()

        # Fine-tuned head has 4 classes; the base checkpoint has 90 (COCO).
        self.model.model.model.reinitialize_detection_head(len(CLASS_NAMES))

        checkpoint = torch.load(weights, map_location=self.device, weights_only=False)
        state = checkpoint.get("model", checkpoint.get("model_state_dict", checkpoint)) \
            if isinstance(checkpoint, dict) else checkpoint
        missing, unexpected = self.model.model.model.load_state_dict(state, strict=False)
        if unexpected:
            print(f"[detector] warning: {len(unexpected)} unexpected keys, e.g. {unexpected[:2]}")
        if isinstance(checkpoint, dict) and "epoch" in checkpoint:
            print(f"[detector] loaded checkpoint (epoch {checkpoint['epoch']})")
        print("[detector] ready")

    def best_ball(self, frame_bgr: np.ndarray) -> BallDetection | None:
        """Run detection on one BGR frame; return the most confident ball, or None."""
        h, w = frame_bgr.shape[:2]
        scale = 1.0
        img = frame_bgr
        # RF-DETR resizes internally to its train resolution (560), so downscaling
        # here only throws away ball detail for no speed gain. Leave infer_width<=0
        # (native) unless you specifically want to trade accuracy for a smaller decode.
        if self.infer_width and self.infer_width > 0 and w > self.infer_width:
            scale = self.infer_width / w
            img = _resize(frame_bgr, self.infer_width, int(round(h * scale)))

        # OpenCV is BGR; RF-DETR wants an RGB PIL image.
        pil = Image.fromarray(img[:, :, ::-1])
        det = self.model.predict(pil, threshold=self.ball_threshold)

        if det is None or det.class_id is None or len(det.class_id) == 0:
            return None

        best: BallDetection | None = None
        for i in range(len(det.class_id)):
            if int(det.class_id[i]) != BALL_CLASS_ID:
                continue
            conf = float(det.confidence[i])
            if best is None or conf > best.confidence:
                x1, y1, x2, y2 = (float(v) for v in det.xyxy[i])
                # map box back to original frame coordinates
                inv = 1.0 / scale
                best = BallDetection(conf, (x1 * inv, y1 * inv, x2 * inv, y2 * inv))
        return best


def _resize(frame_bgr: np.ndarray, w: int, h: int) -> np.ndarray:
    import cv2

    return cv2.resize(frame_bgr, (w, h), interpolation=cv2.INTER_AREA)
