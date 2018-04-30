"""Integration tests for the messages routes."""

from flask import url_for


def test_create_thread(client, faker, logged_in_user):
    creator, headers = logged_in_user
    payload = faker.thread_payload()
    resp = client.post(
        url_for('api.ThreadsView:post'),
        json=payload,
        headers=headers,
    )

    assert resp.status_code == 201
    assert resp.json
    assert resp.json['title'] == payload['title']


def test_get_threads(client, faker, logged_in_user):
    creator, headers = logged_in_user
    og_thread = faker.thread(creator, faker.friends(creator, 3))
    resp = client.get(
        url_for('api.ThreadsView:index'),
        headers=headers,
    )

    assert resp.status_code == 200
    assert resp.json
    assert len(resp.json) == 1

    resp_thread = resp.json[0]

    assert 'messages' in resp_thread
    assert len(resp_thread['messages']) == 1
    assert resp_thread['id'] == og_thread.id


def test_get_thread(client, faker, logged_in_user):
    creator, headers = logged_in_user
    og_thread = faker.thread(creator, faker.friends(creator, 3))
    resp = client.get(
        url_for('api.ThreadsView:get', thread_id=og_thread.id),
        headers=headers,
    )

    assert resp.status_code == 200
    assert resp.json
