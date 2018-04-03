"""Base controller for shared routes."""

from flask import jsonify
from flask_classful import FlaskView
from flask_jwt import current_identity
from fleaker.marshmallow import Schema
from werkzeug.datastructures import ImmutableDict
from werkzeug.utils import cached_property


class BaseView(FlaskView):

    schema_class = Schema
    trailing_slash = False
    excluded_methods = [
        'schema',
        'serialize',
        'context',
    ]

    @cached_property
    def schema(self):
        return self.schema_class()

    def serialize(self, records, many=False):
        return jsonify(self.schema.dump(records, many=many).data)

    @cached_property
    def context(self) -> ImmutableDict:
        return ImmutableDict({
            'current_user': current_identity,
        })
