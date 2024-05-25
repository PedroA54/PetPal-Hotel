<<<<<<< HEAD
from random import choice as rc
from random import randint

# Local imports
from config import app, db

# Remote library imports
from faker import Faker
from models import Package

# from server.models.models import db
=======
#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db
>>>>>>> 0b49a78 (adds necesssary files)

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
<<<<<<< HEAD

        # Seed code goes here!

        def seed_packages():
            ultra_package = Package(
                name="Ultra Package",
                description="Includes a 15 min walk, playtime in the yard for 15 min, and indoor social time for 15 min",
                price_per_night=50.00,
            )
            deluxe_package = Package(
                name="Deluxe Package",
                description="Includes a 30 min walk, playtime in the yard for 30 min, and indoor social time for 30 min",
                price_per_night=75.00,
            )
            diamond_package = Package(
                name="Diamond Package",
                description="Includes a 1 hour of outdoor walk, playtime in the yard for 1 hour, and indoor social time for 1 hour a day",
                price_per_night=85.00,
            )

            db.session.add(ultra_package)
            db.session.add(deluxe_package)
            db.session.add(diamond_package)
            db.session.commit()

        seed_packages()
=======
        # Seed code goes here!
>>>>>>> 0b49a78 (adds necesssary files)
