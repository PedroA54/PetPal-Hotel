"""initial migration

Revision ID: c47f802959cd
Revises: 
Create Date: 2024-05-29 15:26:28.708550

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c47f802959cd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('customers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userName', sa.String(length=100), nullable=False),
    sa.Column('_password_hash', sa.String(length=128), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('packages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('price_per_night', sa.Float(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('animals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('species', sa.String(length=100), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('photo_url', sa.String(length=255), nullable=True),
    sa.Column('customer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], name=op.f('fk_animals_customer_id_customers'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('check_in_date', sa.Date(), nullable=False),
    sa.Column('animal_id', sa.Integer(), nullable=False),
    sa.Column('package_id', sa.Integer(), nullable=False),
    sa.Column('check_out_date', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['animal_id'], ['animals.id'], name=op.f('fk_bookings_animal_id_animals'), ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['package_id'], ['packages.id'], name=op.f('fk_bookings_package_id_packages'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bookings')
    op.drop_table('animals')
    op.drop_table('packages')
    op.drop_table('customers')
    # ### end Alembic commands ###
