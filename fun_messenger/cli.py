"""Entrypoint for the Flask CLI."""

import click

from fun_messenger import models

from .app import create_app
from .extensions import db, jwt


app = create_app()


@app.cli.command()
@click.option('--first-name', prompt='First name')
@click.option('--last-name', prompt='Last name')
@click.option('--email', prompt='Email')
@click.password_option('--password', prompt='Password')
def create_user(first_name, last_name, email, password):
    """Create a user to test the app."""
    user = models.User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
    )

    db.session.add(user)
    db.session.commit()

    token = jwt.jwt_encode_callback(user).decode('utf-8')

    click.echo(f"Created user {email}")
    click.echo(f"Here's a JWT to play around with: {token}")
