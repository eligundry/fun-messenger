"""Users controller."""

from flask import request
from flask_classful import route
from flask_jwt import jwt_required, current_identity

from fun_messenger.extensions import db
from fun_messenger.schemata import UserSchema
from fun_messenger import models

from .base import BaseView


class UsersView(BaseView):

    route_base = '/users'
    schema_class = UserSchema

    @jwt_required()
    def index(self):
        users = models.User.get_all()
        return self.serialize(users, many=True)

    @route('/<uuid:user_id>', methods=['GET'])
    @jwt_required()
    def get(self, user_id: str):
        user = models.User.get_all().filter_by(id=str(user_id)).one()
        return self.serialize(user)

    @route('/me', methods=['GET'])
    @jwt_required()
    def get_me(self):
        return self.serialize(current_identity)

    @route('/me', methods=['PATCH'])
    @jwt_required()
    def update_me(self):
        pass

    @route('/me/friends', methods=['GET'])
    @jwt_required()
    def my_friends(self):
        friends = models.User.get_friends(current_identity.id)
        return self.serialize(friends, many=True)

    @route('/<uuid:user_id>/friends', methods=['GET'])
    @jwt_required()
    def friends(self, user_id: str):
        friends = models.User.get_friends(user_id)
        return self.serialize(friends, many=True)

    @route('/sign-up', methods=['POST'])
    def sign_up(self):
        user = models.User(**self.schema.load(request.get_json()).data)
        db.session.add(user)
        db.session.commit()

        return self.serialize(user), 201
