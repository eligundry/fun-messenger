"""Fixtures for Fun Messenger."""

import faker as _faker

from .user import UserProvider


faker = _faker.Faker()
faker.add_provider(UserProvider)
