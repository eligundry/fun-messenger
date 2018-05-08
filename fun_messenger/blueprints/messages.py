"""Messages controller."""

from flask import request, jsonify
from flask_classful import route
from flask_jwt import current_identity, jwt_required

from fun_messenger import models
from fun_messenger.schemata import MessageSchema

from .base import BaseView


class MessagesView(BaseView):

    route_prefix = '/threads/<uuid:thread_id>/messages'
    decorators = [jwt_required()]
    schema_class = MessageSchema

    @route('/', methods=['GET'])
    def index(self, thread_id):
        models.Thread.get_thread(current_identity.id, str(thread_id))
        messages = models.Message.get_thread_messages(str(thread_id))
        return self.serialize(messages, many=True), 200

    @route('/', methods=['POST'])
    def post(self, thread_id):
        message = models.Message.create_message(
            str(thread_id),
            current_identity,
            self.schema.load(request.get_json()).data,
        )
        return self.serialize(message), 201

    @route('/<uuid:message_id>', methods=['DELETE'])
    def delete(self, thread_id, message_id):
        models.Message.archive_message(str(message_id), current_identity)
        return jsonify({}), 204
