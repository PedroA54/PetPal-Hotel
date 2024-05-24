from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

from config import db

db = SQLAlchemy()

# Models go here!
class Customer(db.Model, SerializerMixin):
    __tablename__ = "customer"
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(100), nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)

    # Relationships
    bookings = db.relationship("Booking", back_populates="customer")
    packages = db.relationship("Package", back_populates="customer")


    @hybrid_property
    def password_hash(self):
        raise AttributeError("Passwords cannot be inspected after being setup!")

    @password_hash.setter
    def password_hash(self, new_password):
        hashed_password = generate_password_hash(new_password).decode("utf-8")
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return check_password_hash(self._password_hash, password_to_check)
class Animal(db.Model, SerializerMixin):
    __tablename__ = "animals"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    species = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    
    # Relationships
    packages = db.relationship("Package", back_populates="animal")   

class Booking(db.Model,  SerializerMixin):
    __tablename__ = "booking"
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)
    
    # Relationships
    customer = db.relationship("Customer", back_populates="bookings")
    packages = db.relationship("Package", back_populates="booking")

class Package(db.Model,  SerializerMixin):
    __tablename__ = "package"
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('booking.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'),nullable=False)

    # Relationships
    customer = db.relationship("Customer", back_populates="packages")
    animal = db.relationship("Animal", back_populates="packages")
    booking = db.relationship("Booking", back_populates="packages")