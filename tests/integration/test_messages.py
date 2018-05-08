"""Integration tests for the messages routes."""

from flask import url_for


def test_create_message(client, faker, logged_in_user):
    creator, headers = logged_in_user
    thread = faker.thread(creator)
    payload = faker.message_payload()
    resp = client.post(
        url_for('api.MessagesView:post', thread_id=thread.id),
        json=payload,
        headers=headers,
    )

    assert resp.status_code == 201
    assert resp.json
    assert resp.json['text'] == payload['text']


def test_get_messages(client, faker, logged_in_user):
    creator, headers = logged_in_user
    thread = faker.thread(creator)
    messages = list(faker.messages(creator, thread, count=3))
    resp = client.get(
        url_for('api.MessagesView:index', thread_id=thread.id),
        headers=headers,
    )

    assert resp.status_code == 200
    assert resp.json
    # Messages created by fixture + initial message
    assert len(resp.json) == len(messages) + 1


def test_delete_message(client, faker, logged_in_user):
    creator, headers = logged_in_user
    thread = faker.thread(creator)
    message = faker.message(creator, thread)
    resp = client.delete(
        url_for(
            'api.MessagesView:delete',
            thread_id=thread.id,
            message_id=message.id
        ),
        headers=headers,
    )

    assert resp.status_code == 204
