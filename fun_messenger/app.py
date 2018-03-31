"""Application factory for fun-messenger."""

import os

from fleaker import DEFAULT_DICT
from fleaker.app import (
    BaseApplication, FleakerJSONApp, LoggingAwareApp, FlaskClientAwareApp,
    MultiStageConfigurableApp
)

import fun_messenger.extensions as ext
import fun_messenger.models.user as user

from fun_messenger.blueprints import register_api_routes


class FunMessengerApp(FleakerJSONApp, LoggingAwareApp,
                      FlaskClientAwareApp, MultiStageConfigurableApp):
    """Custom app that uses the best of Fleaker."""


def create_app(settings=DEFAULT_DICT):
    """Factory that creates the Flask app."""
    app = FunMessengerApp(__name__)
    app.configure(settings, os.environ, 'fun_messenger.settings')

    # Init the extensions
    ext.bcrypt.init_app(app)
    ext.db.init_app(app)
    ext.jwt.init_app(app)
    ext.marshmallow.init_app(app)
    ext.migrate.init_app(app, ext.db)
    ext.socketio.init_app(app)

    # Attach the API routes
    register_api_routes(app)

    return app
