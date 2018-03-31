"""Threads controller."""

from flask_classful import FlaskView


class ThreadsView(FlaskView):

    route_base = '/threads'

    def index(self):
        pass

    def get(self, id):
        pass
