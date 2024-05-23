from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Models go here!
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    _password_hash = db.Column(db.String(128), nullable=False)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Passwords cannot be inspected after being setup!")

    @password_hash.setter
    def password_hash(self, new_password):
        hashed_password = generate_password_hash(new_password).decode("utf-8")
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return check_password_hash(self._password_hash, password_to_check)
class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    species = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)

    owner = db.relationship('Customer', back_populates='animals')

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)
    animals = db.relationship('Animal', secondary='animal_booking', back_populates='bookings')

    customer = db.relationship('Customer', back_populates='bookings')
class AnimalBooking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('booking.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
    notes = db.Column(db.Text)