"""Portfolio site.

Flask + Jinja is used purely as a *build-time* templating tool: run
``python build_static.py`` to render everything into ``dist/``, which is
deployed to a static host (no server, so no cold starts).

For local development you can still run ``python app.py``.
"""

import json
import os
from pathlib import Path

from flask import Flask, Response, render_template

ROOT = Path(__file__).resolve().parent

# Public origin of the deployed site, e.g. https://yourname.dev
# Used for canonical URLs, Open Graph tags, robots.txt and the sitemap.
SITE_URL = os.environ.get("SITE_URL", "").rstrip("/")

app = Flask(__name__)


def load_projects():
    with open(ROOT / "data" / "featured_projects.json", encoding="utf-8") as f:
        return json.load(f)


@app.context_processor
def inject_globals():
    return {"site_url": SITE_URL, "projects": load_projects()}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/robots.txt")
def robots():
    body = "User-agent: *\nAllow: /\n"
    if SITE_URL:
        body += f"\nSitemap: {SITE_URL}/sitemap.xml\n"
    return Response(body, mimetype="text/plain")


@app.route("/sitemap.xml")
def sitemap():
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"  <url><loc>{SITE_URL}/</loc><priority>1.0</priority></url>\n"
        "</urlset>\n"
    )
    return Response(xml, mimetype="application/xml")


if __name__ == "__main__":
    app.run(debug=True)
