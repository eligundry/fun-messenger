"""Entrypoint for the Flask CLI."""

from .app import create_app


app = create_app()
