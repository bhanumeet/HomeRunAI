"""AI director switching logic.

Rule for now (ball-only): the live camera is whichever one currently has the
highest ball confidence. To avoid cutting on every noisy frame we add
hysteresis: a challenger must beat the current live camera by `margin` and stay
ahead for `hold_seconds` before we actually cut to it.
"""
from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Director:
    margin: float = 0.08
    hold_seconds: float = 0.8
    min_confidence: float = 0.4
    default_cam: str | None = None  # resting shot shown when no ball is visible

    live: str | None = None
    _candidate: str | None = None
    _candidate_since: float = 0.0
    last_reason: str = "waiting for detections"
    scores: dict[str, float] = field(default_factory=dict)

    def update(self, scores: dict[str, float], now: float) -> str | None:
        """scores: {cam_id: ball_confidence (0 if no ball)}. Returns the live cam id."""
        self.scores = dict(scores)

        eligible = {cid: c for cid, c in scores.items() if c >= self.min_confidence}

        # Nobody sees the ball.
        if not eligible:
            self._candidate = None
            if self.default_cam is not None:
                # cut back to the resting shot (e.g. the webcam)
                self.last_reason = f"no ball — default {self.default_cam}"
                self.live = self.default_cam
            else:
                self.last_reason = "no ball in view — holding"
                if self.live is None and scores:
                    self.live = max(scores, key=scores.get)  # seed something
            return self.live

        top = max(eligible, key=eligible.get)

        # First ever pick, or current live no longer sees the ball.
        if self.live is None or self.live not in eligible:
            self.live = top
            self._candidate = None
            self.last_reason = f"cut to {top} ({eligible[top]:.2f})"
            return self.live

        # Challenger must clear the live cam by `margin`.
        if top != self.live and eligible[top] >= eligible[self.live] + self.margin:
            if self._candidate != top:
                self._candidate = top
                self._candidate_since = now
            held = now - self._candidate_since
            if held >= self.hold_seconds:
                self.last_reason = (
                    f"cut {self.live}->{top} "
                    f"({eligible[top]:.2f} vs {eligible[self.live]:.2f})"
                )
                self.live = top
                self._candidate = None
            else:
                self.last_reason = (
                    f"{top} leading ({eligible[top]:.2f}), confirming {held:.1f}s"
                )
        else:
            self._candidate = None
            self.last_reason = f"live {self.live} ({eligible[self.live]:.2f})"

        return self.live
