#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

from your_application import db
from your_models import Package

# Remote library imports
from faker import Faker

# Local imports
from app import app
from server.models.models import db

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")


        # Seed code goes here!


def seed_packages():
    ultra_package = Package(
        name="Ultra Package",
        description="Includes a 15 min walk, playtime in the yard for 15 min, and indoor social time for 15 min",
        price_per_night=50.00
    )
    deluxe_package = Package(
        name="Deluxe Package",
        description="Includes a 30 min walk, playtime in the yard for 30 min, and indoor social time for 30 min",
        price_per_night=75.00
    )
    diamond_package = Package(
        name="Diamond Package",
        description="Includes a 1 hour of outdoor walk, playtime in the yard for 1 hour, and indoor social time for 1 hour a day",
        price_per_night=85.00
    )

    db.session.add(ultra_package)
    db.session.add(deluxe_package)
    db.session.add(diamond_package)
    db.session.commit()

seed_packages()