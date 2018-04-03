"""User model."""

from datetime import datetime

from flask import current_app, jsonify
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy_utils.types import ArrowType

from fun_messenger.extensions import bcrypt, db, jwt

from .base import BaseModel


class User(db.Model, BaseModel):
    first_name = db.Column(db.Unicode(255), nullable=False)
    last_name = db.Column(db.Unicode(255), nullable=False)
    email = db.Column(db.Unicode(255), nullable=False, unique=True)
    password = db.Column(db.Unicode(255), nullable=False)

    def password_is_hashed(self):
        return self.password.startswith('$2b$12$')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def hash_password(self, password=None):
        if not password:
            password = self.password

        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email
        return email

    @classmethod
    def get_friends(cls, user_id):
        return (
            cls.query
            .join(Friend, (db.and_(
                db.or_(
                    Friend.initiator_id == user_id,
                    Friend.recipient_id == user_id,
                ),
                Friend.accepted == True,
                Friend.is_archived == False,
            )))
            .filter(User.is_archived == False)
        )


@db.event.listens_for(User, 'before_insert')
def hash_password_before_insert(mapper, connection, target):
    target.hash_password()


@db.event.listens_for(User, 'before_update')
def hash_password_before_update(mapper, connection, target):
    if not target.password_is_hashed():
        target.hash_password()


class PGPKey(db.Model, BaseModel):
    """A public-private keypair that is used to encrypt messages.

    Attributes:
        public_key (str): The plain text version of the user's public key.
        private_key (str): The user's private key, hashed in an HMAC in which
            the secret is the plaintext version of the user's password. This is
            never ever decrypted server side.
    """
    __tablename__ = 'pgp_keys'
    user_id = db.Column(
        UUID,
        db.ForeignKey('users.id'),
        nullable=False
    )
    public_key = db.Column(db.Text, nullable=False)
    private_key = db.Column(db.Text, nullable=False)

    user = db.relationship(
        'User',
        backref=db.backref('pgp_keys', uselist=True),
        lazy=True,
        uselist=False,
    )


class Friend(db.Model, BaseModel):
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
    message = db.Column(db.Text, nullable=True)

    initiator = db.relationship(
        'User',
        backref=db.backref('friendships_initiated', uselist=True),
        lazy=True,
        uselist=False,
        foreign_keys=[initiator_id],
    )
    recipient = db.relationship(
        'User',
        backref=db.backref('friendships_received', uselist=True),
        lazy=True,
        uselist=False,
        foreign_keys=[recipient_id],
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


@jwt.jwt_payload_handler
def make_payload(identity: User) -> dict:
    iat = datetime.utcnow()
    return {
        'exp': iat + current_app.config.get('JWT_EXPIRATION_DELTA'),
        'iat': iat,
        'identity': str(identity.id),
        'nbf': iat + current_app.config.get('JWT_NOT_BEFORE_DELTA'),
    }


@jwt.identity_handler
def identity(payload: dict) -> User:
    return User.query.filter(User.id == payload['identity']).one()



@jwt.jwt_error_handler
def jwt_error_handler(exc):
    return jsonify({
        'message': exc.error,
        'description': exc.description,
    }), 401
