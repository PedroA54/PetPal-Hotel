#!/usr/bin/env python3

# Standard library imports

from datetime import datetime

# Local imports

from config import api, app, bcrypt, db


# Remote library imports

from flask import Flask, jsonify, request, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy

# Add your model imports
from models import Animal, Booking, Customer, Package
from sqlalchemy.exc import IntegrityError


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


# ********
# Customer
# ********
# user.password_hash = password
class SignUp(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("userName")
        password = data.get("password")
        try:
            user = Customer(userName=username)
            user.password_hash = password
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            return user.to_dict(), 201
        except IntegrityError as e:
            db.session.rollback()
            return {"errors": [str(e)]}, 422


class LogIn(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("userName")
        password = data.get("password")
        user = Customer.query.filter_by(userName=username).first()

        if user:
            print(f"User found: {user}")
            hashed_password = user._password_hash
            print(f"Stored hashed password: {hashed_password}")

            if bcrypt.check_password_hash(hashed_password, password):
                session["user_id"] = user.id
                return user.to_dict(), 200
            else:
                print("Password does not match")
                return {"errors": ["Invalid username or password"]}, 401
        else:
            print("User not found")
            return {"errors": ["Invalid username or password"]}, 401


class LogOut(Resource):
    def delete(self):
        session.pop("user_id", None)
        return "", 204


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = Customer.query.filter_by(id=user_id).first()
            if user:
                return user.to_dict(), 200
        return {"error": "User not found"}, 401


class UpdateUser(Resource):
    def patch(self, id):
        user = Customer.query.get_or_404(id)
        data = request.get_json()
        user.userName = data.get("userName", user.userName)
        if "password" in data:
            user.password_hash = data["password"]
        db.session.commit()
        return {"message": "User updated successfully"}, 200


# ********
# Animal
# ********
class AnimalList(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Unauthorized"}, 401

        try:
            customer = Customer.query.get(user_id)
            if not customer:
                return {"error": "Customer not found"}, 404

            animals = Animal.query.filter_by(customer_id=user_id).all()
            return [animal.to_dict() for animal in animals], 200
        except NoResultFound:
            return {"error": "No animals found for this user"}, 404

    def post(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Unauthorized"}, 401

        if request.is_json:
            data = request.get_json()
            new_animal = Animal(
                name=data["name"],
                species=data["species"],
                age=data["age"],
                customer_id=user_id,
                photo_url=data["photo"],
            )
            db.session.add(new_animal)
            db.session.commit()
            return new_animal.to_dict(), 201
        return {"error": "Request must be JSON"}, 400


class AnimalDetail(Resource):
    def get(self, animal_id):
        animal = Animal.query.get_or_404(animal_id)
        return animal.to_dict(), 200

    def delete(self, animal_id):
        animal = Animal.query.get_or_404(animal_id)
        db.session.delete(animal)
        db.session.commit()
        return "", 204

    def patch(self, animal_id):
        if request.is_json:
            data = request.get_json()
            animal = Animal.query.get_or_404(animal_id)
            animal.name = data.get("name", animal.name)
            animal.species = data.get("species", animal.species)
            animal.age = data.get("age", animal.age)
            animal.photo_url = data.get("photo", animal.photo_url)
            db.session.commit()
            return animal.to_dict(), 200
        return {"error": "Request must be JSON"}, 400


# ********
# Booking
# ********
class BookingList(Resource):
    def get(self):
        customer = Customer.query.get(session["user_id"])
        bookings = customer.bookings
        return [booking.to_dict() for booking in bookings], 200

    def post(self):
        data = request.get_json()

        try:
            booking = Booking(
                check_in_date=datetime.strptime(
                    data.get("check_in_date"), "%Y-%m-%d"
                ).date(),
                animal_id=data["animal_id"],
                package_id=data["package_id"],
                check_out_date=datetime.strptime(
                    data.get("check_in_date"), "%Y-%m-%d"
                ).date(),
            )

            db.session.add(booking)
            db.session.commit()
            return booking.to_dict(), 201
        except Exception as e:
            return {"error": str(e)}, 400


class BookingDetail(Resource):
    def get(self, id):
        booking = Booking.query.get_or_404(id)
        return booking.to_dict(), 200

    def patch(self, id):
        booking = Booking.query.get_or_404(id)
        data = request.get_json()
        for field in ["animal_id", "package_id"]:
            if field in data:
                setattr(booking, field, data[field])

        for field in ["check_in_date", "check_out_date"]:
            if field in data:
                setattr(
                    booking, field, datetime.strptime(data[field], "%Y-%m-%d").date()
                )
        db.session.commit()
        return booking.to_dict(), 200

    def delete(self, id):
        booking = Booking.query.get_or_404(id)
        db.session.delete(booking)
        db.session.commit()
        return "", 204


# ********
# Package
# ********
class PackageList(Resource):
    def get(self):
        packages = Package.query.all()
        return [package.to_dict() for package in packages], 200

    def post(self):
        data = request.get_json()
        if not data:
            return {"message": "No input data provided"}, 400

        new_package = Package(
            name=data.get("name"),
            description=data.get("description"),
            price_per_night=data.get("price_per_night"),
        )

        db.session.add(new_package)
        db.session.commit()
        return {"message": "Package added successfully"}, 201


api.add_resource(SignUp, "/signup")
api.add_resource(LogIn, "/login")
api.add_resource(LogOut, "/logout")
api.add_resource(CheckSession, "/check_session")
api.add_resource(UpdateUser, "/users/<int:id>")
api.add_resource(AnimalList, "/animals")
api.add_resource(AnimalDetail, "/animals/<int:animal_id>")
api.add_resource(BookingList, "/bookings")
api.add_resource(BookingDetail, "/bookings/<int:id>")
api.add_resource(PackageList, "/packages")


@app.errorhandler(404)
def not_found(error):
    return {"error": str(error)}, 404


if __name__ == "__main__":
    app.run(port=5555, debug=True)
