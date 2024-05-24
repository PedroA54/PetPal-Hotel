from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

# Models go here!
class Customer(db.Model, SerializerMixin):
    __tablename__ = "customer"
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(100), nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)

    # Relationships
    animals = db.relationship("Animal", back_populates="customer")
    bookings = association_proxy('animals', 'bookings')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('password is not readable')

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
        
class Animal(db.Model, SerializerMixin):
    __tablename__ = "animals"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    species = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    
    # Relationships
    customer = db.relationship("Customer", back_populates="animals")
    bookings = db.relationship("Booking", back_populates="animal")
    packages = association_proxy('bookings', 'package')


class Booking(db.Model,  SerializerMixin):
    __tablename__ = "booking"
    id = db.Column(db.Integer, primary_key=True)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)
    package_id = db.Column(db.Integer, db.ForeignKey('package.id'), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)

    # Relationships
    animal = db.relationship("Animal", back_populates="bookings")
    package = db.relationship("Package", back_populates="bookings")
class Package(db.Model, SerializerMixin):
    __tablename__ = "package"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price_per_night = db.Column(db.Float, nullable=False)

    # Relationships
    bookings = db.relationship("Booking", back_populates="package")
    animals = association_proxy('bookings', 'animal')
