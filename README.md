# Yewo Sidira | Software Engineering Portfolio

A modern software engineering portfolio built with **Flask**, showcasing backend development, software architecture, and engineering projects.

Rather than functioning as a traditional web portfolio, this project is designed to communicate engineering thinking through project case studies, clean architecture, and maintainable code.

---

## Features

- Responsive design
- Flask backend
- Modular Jinja templates
- Engineering-focused UI
- Project case studies
- Modern dark theme
- Clean component-based architecture

---

## Tech Stack

- Python
- Flask
- HTML5
- CSS3
- JavaScript
- Git & GitHub

---

## Running Locally

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
```

Navigate into the project

```bash
cd portfolio
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
python app.py
```

Open your browser at

```
http://127.0.0.1:5000
```

---

## Project Structure

- `app.py` — Flask application and project-data endpoint
- `templates/` — Jinja page and reusable sections
- `static/` — stylesheets, JavaScript, and site assets
- `data/featured_projects.json` — project cards and their links

## Updating Projects

Edit `data/featured_projects.json` to add or update a project. Use `repository: null` for private source code and provide a `demo` URL when a live application is available. Descriptions should distinguish implemented features from planned design.

## Deployment

The site is deployed at [yewo-sidira.onrender.com](https://yewo-sidira.onrender.com/). Render configuration is in `render.yaml`.

Built by **Yewo Sidira**
