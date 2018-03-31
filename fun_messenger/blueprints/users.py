"""Users controller."""

from flask import request, jsonify
from flask_classful import FlaskView, route

from fun_messenger.extensions import db
from fun_messenger.schemata import UserSchema
from fun_messenger import models


class UsersView(FlaskView):

    route_base = '/users'
    schema_class = UserSchema

    def index(self):
        users = models.User.get_all()
        return self.serialize(users, many=True)

    def get(self, user_id: str):
        user = models.User.get_all().filter_by(id=user_id).get()
        return self.serialize(user)

    @route('/friends', methods=['GET'])
    def friends(self, user_id: str):
        friends = models.User.get_friends()
        return self.serialize(friends, many=True)

    @route('/sign-up', methods=['POST'])
    def sign_up(self):
        user = models.User(**self.schema.load(request.copy_json()))
        db.session.add(user)
        db.session.commit()

        return self.serialize(user), 201
