"""Flask extensions for fun-messenger."""

import inflect as _inflect

from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from flask_jwt import JWT
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO


db = SQLAlchemy()
bcrypt = Bcrypt()
inflect = _inflect.engine()
jwt = JWT()
marshmallow = Marshmallow()
migrate = Migrate()
socketio = SocketIO()
