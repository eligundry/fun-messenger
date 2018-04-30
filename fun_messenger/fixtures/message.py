"""Faker provider for creating messages."""

from faker.providers import BaseProvider

from fun_messenger import models
from fun_messenger.extensions import db


class MessageProvider(BaseProvider):

    def thread_payload(self, members=[]) -> dict:
        return {
            'title': self.generator.bs().title(),
            'message': self.generator.text(),
            'members': members,
        }

    def thread(self, creator: models.User, friends=[]) -> models.Thread:
        if len(friends) and isinstance(friends[0], models.User):
            friends = [friend.id for friend in friends]

        thread_payload = self.thread_payload(friends)
        thread = models.Thread.create_thread(creator, thread_payload)

        return thread
