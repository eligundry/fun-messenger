"""Fixtures for the tests."""

import pytest

from fun_messenger.app import create_app
from fun_messenger.extensions import jwt, socketio
from fun_messenger.fixtures import faker as _faker


@pytest.fixture
def app():
    settings = {
        'DEBUG': True,
        'TESTING': True,
        'BCRYPT_LOG_ROUNDS': 5,
    }
    return create_app(settings=settings)


@pytest.fixture
def ws_client(app):
    """Fixture that provides a socketio test client."""
    client = socketio.test_client(app)
    client.connect()

    yield client

    client.disconnect()


@pytest.fixture(scope="session")
def faker():
    return _faker


@pytest.fixture
def logged_in_user(faker):
    user = faker.user()
    token = jwt.jwt_encode_callback(user).decode('utf-8')

    return user, {'Authorization': f'JWT {token}'}
