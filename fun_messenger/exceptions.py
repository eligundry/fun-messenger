"""Custom exceptions for Fun Messenger."""

from werkzeug.exceptions import BadRequest, Forbidden


class FunMessengerError(Exception):
    pass


class InvalidUpdateKey(FunMessengerError, BadRequest):
    pass


class FriendMismatch(FunMessengerError, Forbidden):
    pass
