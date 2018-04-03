"""Messages controller."""

from flask_classful import route
from flask_jwt import jwt_required

from .base import BaseView


class MessagesView(BaseView):

    route_base = '/threads/<uuid:thread_id>/messages'
    decorators = [jwt_required]

    def index(self, thread_id):
        pass

    def post(self, thread_id):
        pass

    @route('/<uuid:message_id>', methods=['DELETE'])
    def delete(self, thread_id, message_id):
        pass
