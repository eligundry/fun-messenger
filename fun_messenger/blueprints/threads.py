"""Threads controller."""

from flask_classful import route
from flask_jwt import jwt_required

from .base import BaseView


class ThreadsView(BaseView):

    route_base = '/threads'
    decorators = [jwt_required]

    def index(self):
        pass

    @route('/<uuid:thread_id>', methods=['GET'])
    def get(self, thread_id):
        pass
