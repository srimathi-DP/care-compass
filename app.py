import json, math, os, secrets, sqlite3
from functools import wraps
from pathlib import Path

from flask import Flask, Response, g, jsonify, redirect, render_template_string, request, send_from_directory, url_for

from rules import assess

BASE = Path(__file__).parent

SCHEMA = """
CREATE TABLE IF NOT EXISTS facility(
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, type TEXT DEFAULT 'government',
  kind TEXT DEFAULT 'clinic', lat REAL NOT NULL, lng REAL NOT NULL, phone TEXT DEFAULT '');
CREATE TABLE IF NOT EXISTS check_log(
  id INTEGER PRIMARY KEY AUTOINCREMENT, level TEXT, symptoms TEXT, at TEXT DEFAULT CURRENT_TIMESTAMP);
"""

ADMIN_HTML = """<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>Care Compass admin</title>
<style>body{font:16px system-ui;max-width:760px;margin:2rem auto;padding:0 1rem}input,select,button{padding:.4rem;margin:.2rem}
table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #ccc;padding:.4rem;text-align:left}</style>
<h1>Care Compass admin</h1><h2>Add a verified facility</h2>
<form method=post><input name=name placeholder="Name" required>
<select name=type><option>government</option><option>private</option></select>
<select name=kind><option>clinic</option><option>hospital</option></select>
<input name=lat placeholder="Latitude" required size=9><input name=lng placeholder="Longitude" required size=9>
<input name=phone placeholder="Phone"><button>Add</button></form>
<h2>{{ rows|length }} facilities</h2><table><tr><th>Name<th>Type<th>Kind<th>Phone<th></tr>
{% for f in rows %}<tr><td>{{ f.name }}<td>{{ f.type }}<td>{{ f.kind }}<td>{{ f.phone }}
<td><form method=post action="/admin/delete/{{ f.id }}"><button>Delete</button></form></tr>{% endfor %}</table>"""


def km(a, b, c, d):
    r = math.radians
    h = math.sin(r(c - a) / 2) ** 2 + math.cos(r(a)) * math.cos(r(c)) * math.sin(r(d - b) / 2) ** 2
    return 12742 * math.asin(math.sqrt(h))


def create_app(db_path=None):
    app = Flask(__name__, static_folder="static", static_url_path="")
    app.config["DB_PATH"] = str(db_path or BASE / "care.db")

    def get_db():
        if "db" not in g:
            g.db = sqlite3.connect(app.config["DB_PATH"])
            g.db.row_factory = sqlite3.Row
        return g.db

    @app.teardown_appcontext
    def close_db(_):
        conn = g.pop("db", None)
        if conn:
            conn.close()

    with sqlite3.connect(app.config["DB_PATH"]) as conn:
        conn.executescript(SCHEMA)
        seed = BASE / "static" / "data" / "facilities.json"
        if conn.execute("SELECT COUNT(*) FROM facility").fetchone()[0] == 0 and seed.exists():
            for f in json.loads(seed.read_text(encoding="utf-8")):
                if "replace me" in f["name"].lower() or "lat" not in f or "lng" not in f:
                    continue
                conn.execute("INSERT INTO facility(name,type,kind,lat,lng,phone) VALUES(?,?,?,?,?,?)",
                             (f["name"], f.get("type", "government"), f.get("kind", "clinic"),
                              f["lat"], f["lng"], f.get("phone", "")))

    @app.get("/")
    def home():
        return send_from_directory(app.static_folder, "index.html")

    @app.post("/api/check")
    def api_check():
        data = request.get_json(silent=True) or {}
        symptoms = data.get("symptoms")
        if not isinstance(symptoms, list):
            return jsonify(error="symptoms must be a list"), 400
        try:
            result = assess(symptoms, str(data.get("duration")), str(data.get("age")))
        except ValueError:
            return jsonify(error="invalid symptoms, duration or age"), 400
        db = get_db()
        db.execute("INSERT INTO check_log(level,symptoms) VALUES(?,?)",
                   (result["lv"], ",".join(sorted(set(map(str, symptoms))))[:200]))
        db.commit()
        return jsonify(result)

    @app.get("/api/facilities")
    def api_facilities():
        try:
            lat, lng = float(request.args["lat"]), float(request.args["lng"])
            radius = min(float(request.args.get("radius", 25)), 100)
        except (KeyError, ValueError):
            return jsonify(error="lat and lng are required numbers"), 400
        rows = get_db().execute("SELECT name,type,kind,lat,lng,phone FROM facility").fetchall()
        return jsonify([dict(r) for r in rows if km(lat, lng, r["lat"], r["lng"]) <= radius])

    # ---------- simple admin (HTTP Basic auth) ----------
    def admin_only(fn):
        @wraps(fn)
        def wrapper(*a, **kw):
            auth = request.authorization
            pw = os.environ.get("ADMIN_PASSWORD", "change-me")
            if not auth or not secrets.compare_digest((auth.password or "").encode(), pw.encode()):
                return Response("Login required", 401, {"WWW-Authenticate": 'Basic realm="Care Compass admin"'})
            return fn(*a, **kw)
        return wrapper

    @app.route("/admin", methods=["GET", "POST"])
    @admin_only
    def admin():
        db = get_db()
        if request.method == "POST":
            try:
                t = request.form["type"] if request.form["type"] in ("government", "private") else "government"
                k = request.form["kind"] if request.form["kind"] in ("hospital", "clinic") else "clinic"
                db.execute("INSERT INTO facility(name,type,kind,lat,lng,phone) VALUES(?,?,?,?,?,?)",
                           (request.form["name"].strip()[:120], t, k, float(request.form["lat"]),
                            float(request.form["lng"]), request.form.get("phone", "").strip()[:30]))
                db.commit()
            except (KeyError, ValueError):
                pass
            return redirect(url_for("admin"))
        rows = db.execute("SELECT * FROM facility ORDER BY name").fetchall()
        return render_template_string(ADMIN_HTML, rows=rows)

    @app.post("/admin/delete/<int:fid>")
    @admin_only
    def admin_delete(fid):
        db = get_db()
        db.execute("DELETE FROM facility WHERE id=?", (fid,))
        db.commit()
        return redirect(url_for("admin"))

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)