#!/usr/bin/env bash
# One-time setup. Builds a Python 3.11 venv (torch/rfdetr have no 3.14 wheels).
set -e
cd "$(dirname "$0")"

PY=python3.11
command -v $PY >/dev/null || { echo "Need python3.11 (brew install python@3.11)"; exit 1; }

echo "==> creating venv (.venv)"
$PY -m venv .venv
source .venv/bin/activate

echo "==> upgrading pip"
pip install --upgrade pip wheel

echo "==> installing requirements (this pulls in torch, ~2.5 GB)"
pip install -r requirements.txt

echo
echo "Done. Next:"
echo "  source .venv/bin/activate"
echo "  python download_model.py          # ~1.5 GB checkpoint"
echo "  python -m app.main                # run the director"
echo "  python -m app.main --no-model     # preview UI without the model"
