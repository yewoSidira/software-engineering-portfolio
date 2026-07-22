from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)


@app.route("/")
def home():

    return render_template("index.html")


@app.route("/projects")
def projects():

    with open("data/featured_projects.json", "r", encoding="utf-8") as file:

        projects = json.load(file)

    return jsonify(projects)


if __name__ == "__main__":

    app.run(debug=True)