"""Integration tests for the users routes."""

def test_sign_up_user(client, url_for, faker):
    resp = client.post(
        url_for('api.UsersView:sign_up'),
        json=faker.user_payload(),
    )

    assert resp.status_code == 201
