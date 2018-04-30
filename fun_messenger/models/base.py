"""Base model for all tables."""

import arrow
import stringcase
import sqlalchemy

from fleaker import MISSING
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declared_attr, declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_utils.types import ArrowType

from fun_messenger.exceptions import InvalidUpdateKey
from fun_messenger.extensions import db, inflect


class Base(object):

    @declared_attr
    def id(cls):
        return db.Column(
            UUID(as_uuid=False),
            primary_key=True,
            server_default=sqlalchemy.text("gen_random_uuid()"),
        )

    @declared_attr
    def created_at(cls):
        return db.Column(ArrowType, default=arrow.utcnow)

    @declared_attr
    def updated_at(cls):
        return db.Column(ArrowType, nullable=True)

    @declared_attr
    def archived_at(cls):
        return db.Column(ArrowType, nullable=True)

    @declared_attr
    def __tablename__(cls):
        return stringcase.snakecase(inflect.plural(cls.__name__))

    @declared_attr
    def __table_args__(cls):
        return {
            'extend_existing': True,
        }

    @hybrid_property
    def is_archived(self):
        return self.archived_at != None

    def archive(self):
        self.archived_at = arrow.utcnow()

    def unarchive(self):
        self.archived_at = None

    @classmethod
    def get_all(cls, archived=MISSING):
        query = cls.query

        if archived is not MISSING:
            query = query.filter(cls.is_archived == archived)
        else:
            query = query.filter(cls.is_archived == False)

        return query

    def update(self, data: dict):
        for key, value in data.items():
            if not hasattr(self, key):
                classname = self.__class__.__name__
                raise InvalidUpdateKey(f"{classname} does not have an attribute called {key}.")

            setattr(self, key, value)


BaseModel = declarative_base(cls=Base)


@db.event.listens_for(BaseModel, 'before_update')
def set_updated_at(mapper, connection, target):
    target.updated_at = arrow.utcnow()
