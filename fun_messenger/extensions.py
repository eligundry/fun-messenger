"""Flask extensions for fun-messenger."""

import inflect as _inflect

from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from flask_jwt import JWT
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_uuid import FlaskUUID


db = SQLAlchemy()
bcrypt = Bcrypt()
flask_uuid = FlaskUUID()
inflect = _inflect.engine()
jwt = JWT()
marshmallow = Marshmallow()
migrate = Migrate()
socketio = SocketIO()


def init_extensions(app):
    bcrypt.init_app(app)
    db.init_app(app)
    flask_uuid.init_app(app)
    jwt.init_app(app)
    marshmallow.init_app(app)
    migrate.init_app(app, db)
    socketio.init_app(
        app,
        json=app.json,
        async_mode='eventlet',
        message_queue=app.config['REDIS_URL'],
    )
