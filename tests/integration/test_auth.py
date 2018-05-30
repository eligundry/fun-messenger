"""Integration tests for the authentication routes."""

from flask import url_for


def test_login(client, faker):
    user_data = faker.user_payload()
    faker.user(payload=user_data)

    resp = client.post(
        url_for('_default_auth_request_handler'),
        json={
            'email': user_data['email'],
            'password': user_data['password'],
        },
    )

    assert resp.status_code == 200
    assert 'access_token' in resp.json


def test_bad_login_fails_gracefully(client):
    resp = client.post(
        url_for('_default_auth_request_handler'),
        json={},
    )

    assert resp.status_code < 500
    assert resp.status_code >= 400
    import pdb; pdb.set_trace()  # XXX BREAKPOINT
