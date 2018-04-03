"""Custom exceptions for Fun Messenger."""

from werkzeug.exceptions import BadRequest


class InvalidUpdateKey(BadRequest):
    pass
