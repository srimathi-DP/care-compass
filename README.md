# Care Compass

A rural healthcare companion that helps families in Tamil Nadu understand their symptoms, find nearby care and reach emergency help, in Tamil or English.

## Features
- **Symptom checker:** pick symptoms, duration and age group to get simple guidance (rest at home, see a doctor, or get emergency help), with the reasons shown
- **Find care near me:** hospitals and clinics on a map, with directions and a call button, combining live OpenStreetMap data with a hand-verified list
- **Emergency numbers:** one-tap calling for 108, 112, 102, 104, 181 and 1098
- **Tamil and English:** voice output and speech input, plus a larger-text option
- **Works offline:** installable as a phone app, with local fallback when the server is unreachable
- **Admin page:** add and remove verified facilities without editing code

## Tech stack
Python, Flask, SQLite, SQLAlchemy, JavaScript, Leaflet, OpenStreetMap (Overpass API), Web Speech API, Service Worker, pytest

## Run locally
```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Open http://127.0.0.1:5000. The admin page is at /admin; set the `ADMIN_PASSWORD` environment variable first (the default `change-me` is for local testing only).

Run the tests with `python -m pytest`.

## Disclaimer
Care Compass gives general guidance only. It does not diagnose diseases, prescribe medicines or replace professional medical care.