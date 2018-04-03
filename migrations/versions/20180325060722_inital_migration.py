"""Inital Migration

Revision ID: eeaf72ce2537
Revises:
Create Date: 2018-03-25 06:07:22.204249

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eeaf72ce2537'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    conn.execute(
        """
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NULL,
            archived_at TIMESTAMP NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE pgp_keys (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_ID UUID NOT NULL REFERENCES users,
            public_key TEXT NOT NULL,
            private_key TEXT NOT NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE friends (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            initiator_id UUID NOT NULL REFERENCES users,
            recipient_id UUID NOT NULL REFERENCES users,
            accepted_at TIMESTAMP NULL,
            text TEXT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NULL,
            archived_at TIMESTAMP NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE threads (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title VARCHAR(255) NULL,
            created_by_id UUID NOT NULL REFERENCES users,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NULL,
            archived_at TIMESTAMP NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE thread_users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL REFERENCES users,
            thread_id UUID NOT NULL REFERENCES threads,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NULL,
            archived_at TIMESTAMP NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE messages (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            author_id UUID NOT NULL REFERENCES users,
            thread_id UUID NOT NULL REFERENCES threads,
            text TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NULL,
            archived_at TIMESTAMP NULL
        )
        """
    )


def downgrade():
    conn = op.get_bind()
    conn.execute("DROP TABLE messages")
    conn.execute("DROP TABLE thread_users")
    conn.execute("DROP TABLE threads")
    conn.execute("DROP TABLE friends")
    conn.execute("DROP TABLE pgp_keys")
    conn.execute("DROP TABLE users")
