"""Message models."""

from sqlalchemy.dialects.postgresql import UUID

from fun_messenger.extensions import db
from fun_messenger.exceptions import FriendMismatch

from .base import BaseModel
from .user import User


class Thread(db.Model, BaseModel):
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
            cls.query
            .join(ThreadUser, db.and_(
                ThreadUser.user_id == user_id,
                ThreadUser.thread_id == cls.id,
                ThreadUser.is_archived == False,
            ))
            .filter(cls.is_archived == False)
        )

    @classmethod
    def get_thread(cls, user_id, thread_id):
        return cls.get_threads(user_id).filter(cls.id == thread_id).one()

    @classmethod
    def create_thread(cls, creator, data: dict):
        from .user import Friend

        if not Friend.check(creator.id, data['members']):
            raise FriendMismatch(
                "You must be friends with all members to start a thread."
            )

        thread = cls(title=data['title'], created_by=creator)
        db.session.add(thread)
        db.session.add(ThreadUser(user=creator, thread=thread))

        for user_id in data['members']:
            db.session.add(ThreadUser(
                user_id=user_id,
                thread=thread,
            ))

        db.session.add(Message(
            author=creator,
            thread=thread,
            text=data['message'],
        ))

        db.session.commit()

        return thread


class ThreadUser(db.Model, BaseModel):
    user_id = db.Column(UUID, db.ForeignKey('users.id'), nullable=False)
    thread_id = db.Column(UUID, db.ForeignKey('threads.id'), nullable=False)

    user = db.relationship(
        'User',
        backref=db.backref('threads_in', uselist=True),
        lazy=True,
        uselist=False
    )
    thread = db.relationship(
        'Thread',
        backref=db.backref('users_in', uselist=True),
        lazy=True,
        uselist=False
    )


class Message(db.Model, BaseModel):
    author_id = db.Column(UUID, db.ForeignKey('users.id'), nullable=False)
    thread_id = db.Column(UUID, db.ForeignKey('threads.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)

    author = db.relationship(
        'User',
        backref=db.backref('messages_sent', uselist=True),
        lazy=True,
        uselist=False
    )
    thread = db.relationship(
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
