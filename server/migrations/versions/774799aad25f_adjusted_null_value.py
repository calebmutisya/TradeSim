"""Adjusted null value

Revision ID: 774799aad25f
Revises: c52653afd79c
Create Date: 2024-05-15 13:09:26.732066

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '774799aad25f'
down_revision = 'c52653afd79c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('closed_trades', schema=None) as batch_op:
        batch_op.alter_column('ep',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('closed_trades', schema=None) as batch_op:
        batch_op.alter_column('ep',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
