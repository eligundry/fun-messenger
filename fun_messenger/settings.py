"""Settings for fun-messenger."""

SECRET_KEY = 'please change me!'
SQLALCHEMY_DATABASE_URI = 'postgres://postgres:password@db:5432/fm'
SQLALCHEMY_TRACK_MODIFICATIONS = False
REDIS_URL = 'redis://redis:6379'
BCRYPT_HANDLE_LONG_PASSWORDS = True

# Flask JWT
JWT_AUTH_USERNAME_KEY = 'email'
