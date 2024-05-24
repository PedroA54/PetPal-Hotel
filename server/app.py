#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Customer, Animal, Booking, Package


# Views go here!


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


# ********
# Customer
# ********


# ********
# Animal
# ********


# ********
# Booking
# ********


# ********
# Package
# ********
@app.route("/booking", methods=["POST"])

if __name__ == "__main__":
    app.run(port=5555, debug=True)
