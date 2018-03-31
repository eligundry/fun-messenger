"""Faker provider for creating Users."""

from faker.providers import BaseProvider

from fun_messenger import models
from fun_messenger.extensions import db


class UserProvider(BaseProvider):

    def user_payload(self):
        return {
            'email': self.generator.ascii_safe_email(),
            'first_name': self.generator.first_name(),
            'last_name': self.generator.last_name(),
            'password': self.generator.password(),
        }

    def user(self):
        with db.session.begin_nested() as trans:
            user = models.User(**self.user_payload())
            trans.session.add(user)

        return user
