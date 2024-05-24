#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from flask_migrate import Migrate
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///pet_hotel.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "supersecretkey"

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
api = Api(app)
migrate = Migrate(app, db)

# Add your model imports
from models import Customer, Animal, Booking, Package


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


@app.errorhandler(NotFound)
def not_found(error):
    return {"error": str(error)}, 404


# ********
# Customer
# ********
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
        if user and user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
        return {"errors": ["Invalid username or password"]}, 401


class LogOut(Resource):
    def delete(self):
        session.pop("user_id", None)
        return "", 204


class UpdateUser(Resource):
    def patch(self, id):
        user = Customer.query.get_or_404(id)
        data = request.get_json()
        user.userName = data.get("userName", user.userName)
        if "password" in data:
            user.password_hash = data["password"]
        db.session.commit()


# ********
# Animal
# ********


# ********
# Booking
# ********

# ********
# Package
# ********


class PackageList(Resource):
    def get(self):
        packages = Package.query.all()
        return [package.to_dict() for package in packages], 200


# Adding resources to the API
api.add_resource(SignUp, "/signup")
api.add_resource(LogIn, "/login")
api.add_resource(LogOut, "/logout")
api.add_resource(UpdateUser, "/users/<int:id>")
api.add_resource(PackageList, "/packages")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
