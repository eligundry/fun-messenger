"""Fixtures for the tests."""

import pytest

from fun_messenger.app import create_app
from fun_messenger.extensions import jwt
from fun_messenger.fixtures import faker as _faker


@pytest.fixture
def app():
    settings = {
        'BCRYPT_LOG_ROUNDS': 5,
    }
    return create_app(settings=settings)


@pytest.fixture(scope="session")
def faker():
    return _faker


@pytest.fixture
def logged_in_user(faker):
    user = faker.user()
    token = jwt.jwt_encode_callback(user).decode('utf-8')

    return user, {'Authorization': f'JWT {token}'}
