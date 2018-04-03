"""Application factory for fun-messenger."""

import os

from fleaker import DEFAULT_DICT
from fleaker.app import (
    BaseApplication, FleakerJSONApp, LoggingAwareApp, FlaskClientAwareApp,
    MultiStageConfigurableApp
)

from fun_messenger.blueprints import register_api_routes
from fun_messenger.extensions import init_extensions


class FunMessengerApp(FleakerJSONApp, LoggingAwareApp,
                      FlaskClientAwareApp, MultiStageConfigurableApp):
    """Custom app that uses the best of Fleaker."""


def create_app(settings=DEFAULT_DICT):
    """Factory that creates the Flask app."""
    app = FunMessengerApp(__name__)
    app.configure(settings, os.environ, 'fun_messenger.settings')

    # Init the extensions
    init_extensions(app)

    # Attach the API routes
    register_api_routes(app)

    return app
