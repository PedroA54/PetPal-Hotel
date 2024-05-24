from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)

    # Relationships
    bookings = db.relationship("Booking", back_populates="customer")
    packages = db.relationship("Package", back_populates="customer")


class Animal(db.Model, SerializerMixin):
    __tablename__ = "animal"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    breed = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)

    # Relationships
    packages = db.relationship("Package", back_populates="animal")


class Booking(db.Model, SerializerMixin):
    __tablename__ = "booking"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customer.id"), nullable=False)
    check_in_date = db.Column(db.Date, nullable=False)
    check_out_date = db.Column(db.Date, nullable=False)

    # Relationships
    customer = db.relationship("Customer", back_populates="bookings")
    packages = db.relationship("Package", back_populates="booking")


class Package(db.Model, SerializerMixin):
    __tablename__ = "package"

    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey("booking.id"), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey("customer.id"), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey("animal.id"), nullable=False)
    user_submittable_attribute = db.Column(db.String, nullable=True)

    customer = db.relationship("Customer", back_populates="packages")
    animal = db.relationship("Animal", back_populates="packages")
    booking = db.relationship("Booking", back_populates="packages")
