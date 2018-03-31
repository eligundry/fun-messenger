"""Base controller for shared routes."""

from flask import jsonify
from flask_classful import FlaskView
from fleaker.marshmallow import Schema
from werkzeug.utils import cached_property


class BaseView(FlaskView):

    schema_class = Schema
    excluded_methods = [
        'schema',
        'serialize',
    ]

    @cached_property
    def schema(self):
        return self.schema_class()

    def serialize(self, records, many=False):
        return jsonify(self.schema.dump(records, many=many).data)
