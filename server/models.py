from config import bcrypt, db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Date, ForeignKey, Integer
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin


# Models go here!
class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(100), nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)

    # Relationships
    animals = db.relationship("Animal", back_populates="customer")
    bookings = association_proxy("animals", "bookings")

    serialize_rules = ("-animals.customer", "-_password_hash")

    serialize_rules = ("-animals.customer", "-_password_hash")

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password is not readable")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f"Customer(id={self.id}, userName='{self.userName}')"


class Animal(db.Model, SerializerMixin):
    __tablename__ = "animals"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    species = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    photo_url = db.Column(db.String(255)) 
    customer_id = db.Column(
        db.Integer, db.ForeignKey("customers.id", ondelete="CASCADE"), nullable=False
    )
    # Relationships
    customer = db.relationship("Customer", back_populates="animals")
    bookings = db.relationship("Booking", back_populates="animal")
    packages = association_proxy("bookings", "package")

    serialize_rules = ("-customer.animals",)

    def __repr__(self):
        return f"Animal(id={self.id}, name='{self.name}', species='{self.species}', age={self.age}, customer_id={self.customer_id})"


class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"
    id = db.Column(db.Integer, primary_key=True)
    check_in_date = db.Column(db.Date, nullable=False)
    animal_id = db.Column(
        db.Integer, db.ForeignKey("animals.id", ondelete="CASCADE"), nullable=False
    )
    package_id = db.Column(
        db.Integer, db.ForeignKey("packages.id", ondelete="CASCADE"), nullable=False
    )
    check_out_date = db.Column(db.Date, nullable=False)

    # Relationships
    animal = db.relationship("Animal", back_populates="bookings")
    package = db.relationship("Package", back_populates="bookings")

    serialize_rules = ("-animal.bookings", "-package.bookings")

    def __repr__(self):
        return f"Booking(id={self.id}, animal_id={self.animal_id}, package_id={self.package_id}, check_in_date='{self.check_in_date}', check_out_date='{self.check_out_date}')"


class Package(db.Model, SerializerMixin):
    __tablename__ = "packages"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price_per_night = db.Column(db.Float, nullable=False)

    bookings = db.relationship("Booking", back_populates="package")
    animals = association_proxy("bookings", "animal")

    serialize_rules = ("-bookings.package",)

    def __repr__(self):
        return f"Package(id={self.id}, name='{self.name}', description='{self.description}', price_per_night={self.price_per_night})"
