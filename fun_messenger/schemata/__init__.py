"""Schemata for this application."""

from .message import MessageSchema, ThreadSchema
from .user import UserSchema


__all__ = (
    'MessageSchema',
    'ThreadSchema',
    'UserSchema',
)
