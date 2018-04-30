"""Message related schemata."""

from fleaker.marshmallow import Schema, STR_REQUIRED, REQUIRED
from marshmallow import fields as f


class MessageSchema(Schema):
    id = f.UUID(dump_only=True, **REQUIRED)
    text = f.String(**STR_REQUIRED)


class ThreadSchema(Schema):
    id = f.UUID(dump_only=True, **REQUIRED)
    title = f.String(**STR_REQUIRED)
    members = f.List(f.Integer)
    message = f.String(load_only=True, **STR_REQUIRED)
    messages = f.Nested(MessageSchema, dump_only=True, many=True)
