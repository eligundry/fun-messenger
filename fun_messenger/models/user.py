"""User model."""

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_utils.types import ArrowType

from fun_messenger.extensions import bcrypt, db, jwt

from .base import BaseModel


class User(BaseModel, db.Model):
    first_name = db.Column(db.Unicode(255), nullable=False)
    last_name = db.Column(db.Unicode(255), nullable=False)
    email = db.Column(db.Unicode(255), nullable=False, unique=True)
    password = db.Column(db.Unicode(255), nullable=False)

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def hash_password(self, password=None):
        if not password:
            password = self.password

        self.password = bcrypt.generate_password_hash(password)

    @classmethod
    def get_friends(cls, user_id):
        return (
            cls.query()
            .join(Friend, (db.and_(
                db.or_(
                    Friend.initiator_id == user_id,
                    Friend.recipient_id == user_id
                ),
                Friend.accepted == True,
            )))
            .filter(User.is_archived == False)
        )


class Friend(BaseModel, db.Model):
    initiator_id = db.Column(
        UUID,
        db.ForeignKey('users.id'),
        nullable=False
    )
    recipient_id = db.Column(
        UUID,
        db.ForeignKey('users.id'),
        nullable=False
    )
    accepted_at = db.Column(
        ArrowType,
        nullable=True,
    )

    @hybrid_property
    def accepted(self):
        return self.is_archived is False and self.accepted_at is not None

    @accepted.expression
    def accepted(cls):
        return db.and_(
            cls.archived_at != None,
            cls.accepted_at != None,
        )


@db.event.listens_for(User, 'before_insert')
def hash_password_before_insert(mapper, connection, target):
    target.hash_password()


@jwt.authentication_handler
def authenticate(email, password):
    return (
        User.query()
        .filter(db.and_(
            User.email == email,
            User.password == bcrypt.generate_password_hash(password),
            User.archived_at == None,
        ))
        .first()
    )


@jwt.identity_handler
def identity(payload):
    return User.select().where(User.id == payload['identity']).get()
