#!/usr/bin/env python3
"""Crop owner photo to square and inline it into index.html hero circle."""
import base64
import io
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OWNER = ROOT / "assets" / "images" / "owner.jpg"
INDEX = ROOT / "index.html"


def prepare_image(path: Path) -> bytes:
    from PIL import Image

    img = Image.open(path).convert("RGB")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = max(0, int((h - side) * 0.12))
    top = min(top, h - side)
    img = img.crop((left, top, left + side, top + side))
    img = img.resize((600, 600), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=88, optimize=True)
    return buf.getvalue()


def inline_hero(jpeg_bytes: bytes) -> None:
    b64 = base64.b64encode(jpeg_bytes).decode()
    data_uri = f"data:image/jpeg;base64,{b64}"
    html = INDEX.read_text(encoding="utf-8")
    pattern = r'(<div class="hero-person">\s*<img src=")data:image/[^"]+(" alt=")[^"]*("[^>]*>)'
    if not re.search(pattern, html, flags=re.DOTALL):
        raise SystemExit("Could not find hero-person image in index.html")
    html = re.sub(
        pattern,
        rf'\1{data_uri}\2Software Solutions founder\3',
        html,
        count=1,
        flags=re.DOTALL,
    )
    INDEX.write_text(html, encoding="utf-8")
    print(f"Updated hero image ({len(jpeg_bytes) // 1024}KB)")


def main() -> None:
    if not OWNER.exists():
        raise SystemExit(f"Missing photo: {OWNER}\nAdd your image as assets/images/owner.jpg")
    inline_hero(prepare_image(OWNER))


if __name__ == "__main__":
    main()
