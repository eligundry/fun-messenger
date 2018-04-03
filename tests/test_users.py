"""Integration tests for the users routes."""

from flask import url_for


def test_sign_up_user(client, faker):
    resp = client.post(
        url_for('api.UsersView:sign_up'),
        json=faker.user_payload(),
    )

    assert resp.status_code == 201
    assert resp.json


def test_get_all_users(client, logged_in_user):
    user, headers = logged_in_user
    resp = client.get(
        url_for('api.UsersView:index'),
        headers=headers,
    )

    assert resp.status_code == 200
    assert resp.json


def test_get_friend_by_id(client, logged_in_user, faker):
    user, headers = logged_in_user
    friend = faker.friend(user)
    resp = client.get(
        url_for('api.UsersView:get', user_id=friend.id),
        headers=headers,
    )

    assert resp.status_code == 200
    assert resp.json


def test_get_my_friends(client, logged_in_user, faker):
    user, headers = logged_in_user
    friends = faker.friends(user, 3)
    resp = client.get(
        url_for('api.UsersView:my_friends'),
        headers=headers,
    )

    assert resp.status_code == 200
    assert resp.json
    assert len(resp.json) == len(friends)


def test_get_me(client, logged_in_user):
    user, headers = logged_in_user
    resp = client.get(
        url_for('api.UsersView:get_me'),
        headers=headers,
    )

    assert resp.status_code == 200
    assert resp.json
    assert resp.json['first_name'] == user.first_name
    assert 'password' not in resp.json
