"""Factory that attaches the routes to the application."""

from flask import Blueprint, jsonify
from marshmallow import ValidationError
from sqlalchemy.orm.exc import NoResultFound
from werkzeug.exceptions import BadRequest, Forbidden

from fun_messenger.exceptions import FunMessengerError

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

    @blueprint.errorhandler(BadRequest)
    def bad_request(exc):
        return jsonify({
            'message': exc.args[0],
        }), 400

    @blueprint.errorhandler(Forbidden)
    def forbidden(exc):
        return jsonify({
            'message': exc.args[0],
        }), 403

    @blueprint.errorhandler(FunMessengerError)
    def generic_raised_error(exc):
        return jsonify({
            'message': exc.args[0],
        }), 400

    @blueprint.errorhandler(Exception)
    def generic_built_in_error(exc):
        msg = exc.args[0] if app.config['DEBUG'] else 'Internal Server Error'

        return jsonify({
            'class': exc.__class__.__name__,
            'message': msg,
        }), 500

    app.register_blueprint(blueprint)
