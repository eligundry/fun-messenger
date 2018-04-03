"""User schemata."""

from fleaker.marshmallow import Schema, STR_REQUIRED, REQUIRED
from marshmallow import fields as f


class UserSchema(Schema):
    id = f.UUID()
    first_name = f.String(**STR_REQUIRED)
    last_name = f.String(**STR_REQUIRED)
    email = f.Email(**REQUIRED)
    password = f.String(load_only=True, **REQUIRED)
