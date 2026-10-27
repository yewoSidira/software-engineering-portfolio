"""Build the Flask/Jinja portfolio as a deployable static site."""

import os
import shutil
from pathlib import Path

os.environ.setdefault("SITE_URL", "https://yewosidira.pro")

from app import app  # noqa: E402


ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "dist"


def main():
    if OUTPUT == ROOT or OUTPUT.parent != ROOT:
        raise RuntimeError("Refusing to write outside the project dist directory")

    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    (OUTPUT / "static").mkdir(parents=True)

    with app.test_client() as client:
        for route, destination in (
            ("/", OUTPUT / "index.html"),
            ("/projects.json", OUTPUT / "projects.json"),
            ("/robots.txt", OUTPUT / "robots.txt"),
            ("/sitemap.xml", OUTPUT / "sitemap.xml"),
        ):
            response = client.get(route)
            response.raise_for_status()
            destination.write_bytes(response.data)

    shutil.copytree(ROOT / "static", OUTPUT / "static", dirs_exist_ok=True)
    print(f"Static site built at {OUTPUT}")


if __name__ == "__main__":
    main()
