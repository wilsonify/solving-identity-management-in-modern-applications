# test_integration.py
import requests
import pytest

SERVER_URL = "http://localhost:32001"
CLIENT_URL = "http://localhost:32000"

@pytest.mark.timeout(5)
def test_server_health():
    res = requests.get(f"{SERVER_URL}/api/v1/health")
    assert res.status_code == 200
    assert res.json().get("status") == "ok"

@pytest.mark.timeout(5)
def test_client_fetch_examples():
    res = requests.get(f"{CLIENT_URL}/api/v1/examples")
    assert res.status_code == 200
    assert isinstance(res.json(), list)

@pytest.mark.timeout(5)
def test_client_add_example():
    new_example = {"name": "integration-test"}
    res = requests.post(f"{CLIENT_URL}/api/v1/examples", json=new_example)
    assert res.status_code == 200
    data = res.json()
    assert "id" in data
    assert data.get("name") == "integration-test"

@pytest.mark.timeout(5)
def test_client_fetch_api_spec():
    res = requests.get(f"{CLIENT_URL}/api/v1/spec")
    assert res.status_code == 200
    text = res.text
    assert "openapi: 3.0.1" in text
    assert "title: hydra-server" in text
    assert res.headers["content-type"].startswith(("text/plain", "application/yaml"))
