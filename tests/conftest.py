"""Fixtures for the tests."""

import pytest

from fun_messenger.app import create_app
from fun_messenger.fixtures import faker as _faker


@pytest.fixture
def app():
    return create_app()


@pytest.fixture(scope="session")
def faker():
    return _faker
