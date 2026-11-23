import sqlite3
import pytest
from app import create_app
from rules import assess


@pytest.fixture
def client(tmp_path):
    path = tmp_path / "t.db"
    app = create_app(path)
    with sqlite3.connect(path) as c:
        c.execute("INSERT INTO facility(name,type,kind,lat,lng,phone) VALUES('Test PHC','government','clinic',11.0168,76.9558,'1')")
    return app.test_client()
    
def test_danger_sign_is_red():
    assert assess(["chest"], "1", "adult")["lv"] == "red"

def test_mild_adult_is_green():
    assert assess(["cough"], "1", "adult") == {"lv": "green", "why": ["w_ok"]}

def test_child_fever_is_gold():
    assert assess(["fever"], "1", "child")["lv"] == "gold"

def test_fever_over_3_days_flagged():
    assert "w_fl" in assess(["fever"], "2", "adult")["why"]

def test_invalid_input_rejected():
    with pytest.raises(ValueError):
        assess([], "1", "adult")

def test_api_check_ok(client):
    r = client.post("/api/check", json={"symptoms": ["snake"], "duration": "1", "age": "adult"})
    assert r.status_code == 200 and r.json["lv"] == "red"

def test_api_check_bad_input(client):
    assert client.post("/api/check", json={"symptoms": "fever"}).status_code == 400

def test_facilities_nearby_and_far(client):
    assert len(client.get("/api/facilities?lat=11.02&lng=76.96").json) == 1
    assert client.get("/api/facilities?lat=13.08&lng=80.27").json == []

def test_facilities_requires_coords(client):
    assert client.get("/api/facilities").status_code == 400

def test_admin_needs_password(client):
    assert client.get("/admin").status_code == 401

def test_admin_add_and_list(client):
    import base64
    h = {"Authorization": "Basic " + base64.b64encode(b"a:change-me").decode()}
    client.post("/admin", data={"name": "New PHC", "type": "private", "kind": "hospital", "lat": "11.0", "lng": "77.0"}, headers=h)
    assert b"New PHC" in client.get("/admin", headers=h).data