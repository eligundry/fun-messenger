"""Messages controller."""

from flask_classful import FlaskView


class MessagesView(FlaskView):

    route_base = '/threads/<thread_id>/messages'

    def index(self, thread_id):
        pass

    def post(self, thread_id):
        pass
