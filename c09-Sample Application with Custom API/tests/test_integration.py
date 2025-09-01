import requests
import pytest

SERVER_URL = "http://localhost:32001"
CLIENT_URL = "http://localhost:32000"


# --- Health / readiness / liveness probes ---

@pytest.mark.timeout(5)
def test_health_endpoint():
    res = requests.get(f"{SERVER_URL}/health")
    assert res.status_code == 200
    data = res.json()
    assert data.get("status") in ("ok", "healthy")


@pytest.mark.timeout(5)
def test_liveness_endpoint():
    res = requests.get(f"{SERVER_URL}/liveness")
    assert res.status_code == 200
    data = res.json()
    assert data.get("status") in ("alive", "ok")


@pytest.mark.timeout(5)
def test_readiness_endpoint():
    res = requests.get(f"{SERVER_URL}/readiness")
    assert res.status_code == 200
    data = res.json()
    assert data.get("status") in ("ready", "ok")


# --- Existing API proxy tests ---

@pytest.mark.timeout(5)
def test_client_fetch_articles():
    res = requests.get(f"{CLIENT_URL}/api/v1/articles")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


@pytest.mark.timeout(5)
def test_client_fetch_api_spec():
    res = requests.get(f"{CLIENT_URL}/api/v1/spec")
    assert res.status_code == 200
    text = res.text
    assert "openapi: 3.0.1" in text
    assert "title: hydra-server" in text
