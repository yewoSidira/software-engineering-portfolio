"""Render the Flask/Jinja portfolio into ``dist/`` for static hosting.

Usage:
    SITE_URL=https://yourdomain.com python build_static.py
"""

import shutil
import sys
from pathlib import Path

from app import SITE_URL, app

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "dist"

PAGES = {
    "/": "index.html",
    "/robots.txt": "robots.txt",
    "/sitemap.xml": "sitemap.xml",
}


def main():
    if not SITE_URL:
        print(
            "warning: SITE_URL is not set; canonical URL, sitemap and "
            "Open Graph URL will be empty.",
            file=sys.stderr,
        )

    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()

    with app.test_client() as client:
        for route, filename in PAGES.items():
            response = client.get(route)
            if response.status_code != 200:
                raise SystemExit(f"{route} returned {response.status_code}")
            (OUTPUT / filename).write_bytes(response.data)

    shutil.copytree(ROOT / "static", OUTPUT / "static")

    headers = ROOT / "_headers"
    if headers.exists():
        shutil.copy(headers, OUTPUT / "_headers")

    print(f"Static site built at {OUTPUT}")


if __name__ == "__main__":
    main()
