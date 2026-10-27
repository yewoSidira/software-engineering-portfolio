import os
import json
from flask import Flask, Response, jsonify, render_template

app = Flask(__name__)
SITE_URL = os.environ.get(
    "SITE_URL", "https://yewo-portfolio-static.onrender.com"
).rstrip("/")


@app.context_processor
def inject_site_url():
    return {"site_url": SITE_URL}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/projects")
@app.route("/projects.json")
def projects():
    with open("data/featured_projects.json", "r", encoding="utf-8") as file:
        projects = json.load(file)
    return jsonify(projects)


@app.route('/robots.txt')
def robots():
    return Response(
        f"User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n",
        mimetype="text/plain",
    )


@app.route('/sitemap.xml')
def sitemap():
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f'  <url><loc>{SITE_URL}/</loc><priority>1.0</priority></url>\n'
        '</urlset>\n'
    )
    return Response(xml, mimetype="application/xml")


if __name__ == "__main__":
    app.run(debug=True)
