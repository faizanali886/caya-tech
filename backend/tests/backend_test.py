"""Backend API tests for Caya Technologies."""
import os
import uuid
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://nexus-ecosystem-12.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@cayatech.com"
ADMIN_PASSWORD = "CayaAdmin2026!"


@pytest.fixture(scope="session")
def token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "token" in data and data["user"]["email"] == ADMIN_EMAIL
    return data["token"]


@pytest.fixture(scope="session")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ------------------ Health ------------------
def test_health():
    r = requests.get(f"{API}/", timeout=10)
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


# ------------------ Auth ------------------
def test_login_invalid():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"}, timeout=10)
    assert r.status_code == 401


def test_me_requires_auth():
    r = requests.get(f"{API}/auth/me", timeout=10)
    assert r.status_code == 401


def test_me_with_token(auth_headers):
    r = requests.get(f"{API}/auth/me", headers=auth_headers, timeout=10)
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL


# ------------------ Submissions (public POST) ------------------
def test_submission_create():
    payload = {
        "form_type": "government",
        "name": "TEST User",
        "email": f"test_{uuid.uuid4().hex[:6]}@example.com",
        "organization": "TEST Gov",
        "message": "Testing submission",
    }
    r = requests.post(f"{API}/submissions", json=payload, timeout=10)
    assert r.status_code == 200, r.text
    assert "id" in r.json()


def test_submissions_list_requires_auth():
    r = requests.get(f"{API}/submissions", timeout=10)
    assert r.status_code == 401


def test_submissions_list_with_auth(auth_headers):
    r = requests.get(f"{API}/submissions", headers=auth_headers, timeout=10)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


def test_submission_stats(auth_headers):
    r = requests.get(f"{API}/submissions/stats", headers=auth_headers, timeout=10)
    assert r.status_code == 200
    d = r.json()
    for k in ["total", "unread", "newsletter", "articles"]:
        assert k in d


# ------------------ Newsletter ------------------
def test_newsletter_subscribe():
    email = f"test_news_{uuid.uuid4().hex[:6]}@example.com"
    r = requests.post(f"{API}/newsletter", json={"email": email}, timeout=10)
    assert r.status_code == 200
    assert "message" in r.json()


def test_newsletter_list_requires_auth():
    r = requests.get(f"{API}/newsletter", timeout=10)
    assert r.status_code == 401


def test_newsletter_list_with_auth(auth_headers):
    r = requests.get(f"{API}/newsletter", headers=auth_headers, timeout=10)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# ------------------ Articles ------------------
def test_public_articles():
    r = requests.get(f"{API}/articles", timeout=10)
    assert r.status_code == 200
    articles = r.json()
    assert isinstance(articles, list) and len(articles) >= 1


def test_article_detail_by_slug():
    r = requests.get(f"{API}/articles", timeout=10)
    slug = r.json()[0]["slug"]
    d = requests.get(f"{API}/articles/{slug}", timeout=10)
    assert d.status_code == 200
    assert d.json()["slug"] == slug


def test_admin_articles_requires_auth():
    r = requests.get(f"{API}/admin/articles", timeout=10)
    assert r.status_code == 401


def test_article_crud(auth_headers):
    # Create
    payload = {
        "title": f"TEST Article {uuid.uuid4().hex[:6]}",
        "excerpt": "TEST excerpt",
        "body": "TEST body",
        "category": "Guide",
        "tags": ["test"],
        "status": "published",
    }
    r = requests.post(f"{API}/admin/articles", json=payload, headers=auth_headers, timeout=10)
    assert r.status_code == 200, r.text
    art = r.json()
    aid = art["id"]
    slug = art["slug"]
    assert art["title"] == payload["title"]

    # Public visibility
    pub = requests.get(f"{API}/articles/{slug}", timeout=10)
    assert pub.status_code == 200

    # Update
    payload["title"] = payload["title"] + " EDIT"
    u = requests.put(f"{API}/admin/articles/{aid}", json=payload, headers=auth_headers, timeout=10)
    assert u.status_code == 200
    assert u.json()["title"].endswith("EDIT")

    # Delete
    d = requests.delete(f"{API}/admin/articles/{aid}", headers=auth_headers, timeout=10)
    assert d.status_code == 200

    # Verify gone
    gone = requests.get(f"{API}/articles/{slug}", timeout=10)
    assert gone.status_code == 404
