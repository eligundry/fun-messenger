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

    def message_payload(self) -> dict:
        return {
            'text': self.generator.text(),
        }

    def message(self, creator: models.User, thread: models.Thread) -> models.Message:
        message = models.Message.create_message(
            str(thread.id),
            creator,
            self.message_payload(),
        )

        db.session.add(message)
        db.session.commit()

        return message

    def messages(self, creator, thread, count=3):
        for _ in range(count):
            yield self.message(creator, thread)
