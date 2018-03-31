"""Message models."""

from sqlalchemy.dialects.postgresql import UUID

from fun_messenger.extensions import db

from .base import BaseModel


class Thread(BaseModel, db.Model):
    title = db.Column(db.Unicode(255), nullable=True)
    created_by_id = db.Column(UUID, db.ForeignKey('users.id'), nullable=False)

    created_by = db.relationship(
        'User',
        backref=db.backref('threads_created', uselist=True),
        lazy=True,
        uselist=False
    )

    @classmethod
    def get_threads(cls, user_id):
        return (
            cls.query()
            .join(ThreadUser, db.and_(
                ThreadUser.user_id == user_id,
                ThreadUser.thread_id == cls.id,
                ThreadUser.is_archived == False,
            ))
            .filter(cls.is_archived == False)
        )


class ThreadUser(BaseModel, db.Model):
    user_id = db.Column(UUID, db.ForeignKey('users.id'), nullable=False)
    thread_id = db.Column(UUID, db.ForeignKey('threads.id'), nullable=False)

    user = db.relationship(
        'User',
        backref=db.backref('threads_in', uselist=True),
        lazy=True,
        uselist=False
    )
    threads = db.relationship(
        'Thread',
        backref=db.backref('users_in', uselist=True),
        lazy=True,
        uselist=False
    )


class Message(BaseModel, db.Model):
    author_id = db.Column(UUID, db.ForeignKey('users.id'), nullable=False)
    # thread_id = db.Column(UUID, db.ForeignKey('threads.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)

    user = db.relationship(
        'User',
        backref=db.backref('messages_sent', uselist=True),
        lazy=True,
        uselist=False
    )
    threads = db.relationship(
        'Thread',
        backref=db.backref('messages', uselist=True),
        lazy=True,
        uselist=False
    )

    @classmethod
    def get_thread_messages(cls, thread_id):
        return (
            cls.query()
            .filter(db.and_(
                cls.thread_id == thread_id,
                cls.is_archived == False,
            ))
        )
