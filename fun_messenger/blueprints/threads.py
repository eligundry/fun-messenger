"""Threads controller."""

from flask import request
from flask_classful import route
from flask_jwt import current_identity, jwt_required

from fun_messenger import models
from fun_messenger.schemata import ThreadSchema

from .base import BaseView


class ThreadsView(BaseView):

    route_prefix = '/threads'
    decorators = [jwt_required()]
    schema_class = ThreadSchema

    def index(self):
        threads = models.Thread.get_threads(current_identity.id)
        return self.serialize(threads, many=True), 200

    def post(self):
        thread = models.Thread.create_thread(
            current_identity,
            self.schema.load(request.get_json()).data,
        )
        return self.serialize(thread), 201

    @route('/<uuid:thread_id>', methods=['GET'])
    def get(self, thread_id):
        thread = models.Thread.get_thread(current_identity.id, str(thread_id))
        return self.serialize(thread), 200
