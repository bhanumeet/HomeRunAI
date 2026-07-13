"""Download the RF-DETR SoccerNet checkpoint (~1.5 GB) into ./weights/."""
from huggingface_hub import hf_hub_download

REPO = "julianzu9612/RFDETR-Soccernet"
FILE = "weights/checkpoint_best_regular.pth"


def main():
    print(f"Downloading {FILE} from {REPO} (~1.5 GB)…")
    path = hf_hub_download(repo_id=REPO, filename=FILE, local_dir=".")
    print(f"Saved to {path}")


if __name__ == "__main__":
    main()
