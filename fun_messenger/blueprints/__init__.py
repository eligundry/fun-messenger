"""Factory that attaches the routes to the application."""

from flask import Blueprint, jsonify
from marshmallow import ValidationError
from sqlalchemy.orm.exc import NoResultFound

from .messages import MessagesView
from .threads import ThreadsView
from .users import UsersView


def register_api_routes(app):
    blueprint = Blueprint('api', __name__)

    # Register the blueprints
    MessagesView.register(blueprint)
    ThreadsView.register(blueprint)
    UsersView.register(blueprint)

    # Register the global error handlers
    @blueprint.errorhandler(NoResultFound)
    def no_result_found(exc):
        return jsonify({
            'message': exc.args[0],
        }), 404

    @blueprint.errorhandler(ValidationError)
    def validation_error(exc):
        return jsonify({
            'message': exc.args[0],
        }), 400

    blueprint.register(app, {})
