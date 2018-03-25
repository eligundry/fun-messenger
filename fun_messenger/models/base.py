"""Base model for all tables."""

import arrow
import stringcase
import sqlalchemy

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils.types import ArrowType
from werkzeug.utils import cached_property

from fun_messenger.extensions import db, inflect


_Base = declarative_base()


class BaseModel(_Base):
    id = db.Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=sqlalchemy.text("gen_random_uuid()"),
    )
    created_at = db.Column(ArrowType, default=arrow.utcnow)
    updated_at = db.Column(ArrowType, nullable=True)
    archived_at = db.Column(ArrowType, nullable=True)

    @cached_property
    def __tablename__(self):
        return stringcase.snakecase(inflect.plural(self.__class__.__name__))


@db.event.listens_for(BaseModel, 'before_update')
def set_updated_at(mapper, connection, target):
    target.updated_at = arrow.utcnow()
