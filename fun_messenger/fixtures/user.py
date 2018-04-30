"""Faker provider for creating Users."""

import arrow

from faker.providers import BaseProvider

from fun_messenger import models
from fun_messenger.extensions import db


class UserProvider(BaseProvider):

    def user_payload(self) -> dict:
        return {
            'email': self.generator.ascii_safe_email(),
            'first_name': self.generator.first_name(),
            'last_name': self.generator.last_name(),
            'password': self.generator.password(),
        }

    def user(self) -> models.User:
        with db.session.begin_nested() as trans:
            user = models.User(**self.user_payload())
            trans.session.add(user)

        return user

    def friend(self, user: models.User) -> models.User:
        with db.session.begin_nested() as trans:
            friend = models.User(**self.user_payload())

            if self.generator.pybool():
                initiator = user
                recipient = friend
            else:
                initiator = friend
                recipient = user

            trans.session.add(friend)
            trans.session.add(models.Friend(
                initiator=initiator,
                recipient=recipient,
                accepted_at=arrow.utcnow(),
            ))

        db.session.commit()

        return friend

    def friends(self, user: models.User, count: int):
        fs = []

        for _ in range(count):
            fs.append(self.friend(user))

        return fs
