"""Fixtures for Fun Messenger."""

import faker as _faker

from .message import MessageProvider
from .user import UserProvider


faker = _faker.Faker()
faker.add_provider(UserProvider)
faker.add_provider(MessageProvider)
