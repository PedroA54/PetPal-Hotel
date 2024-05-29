from config import db
from datetime import date
from models import Animal, Booking, Package, Customer
from app import app

if __name__ == "__main__":
    with app.app_context():

        # Customer

        u1 = Customer(id=1, userName="username1", _password_hash="password_hash1")
        u2 = Customer(id=2, userName="username2", _password_hash="password_hash2")
        u3 = Customer(id=3, userName="username3", _password_hash="password_hash3")
        u4 = Customer(id=4, userName="username4", _password_hash="password_hash4")

        db.session.add_all([u1, u2, u3, u4])
        db.session.commit()

        # Animals
        a1 = Animal(name="Max", age=5, species="Dog", customer_id=1)

        a2 = Animal(name="Daisy", age=3, species="Cat", customer_id=2)

        a3 = Animal(name="Joe", age=2, species="Rabbit", customer_id=3)

        a4 = Animal(name="Henry", age=1, species="Parrot", customer_id=4)

        db.session.add_all([a1, a2, a3, a4])
        db.session.commit()

        # Booking
        # Animal_id, Package_id, Checkin date , check out date
        check_in_dates = [
            date(2024, 5, 1),
            date(2024, 5, 3),
            date(2024, 5, 5),
            date(2024, 5, 7),
        ]
        check_out_dates = [
            date(2024, 5, 7),
            date(2024, 5, 9),
            date(2024, 5, 11),
            date(2024, 5, 13),
        ]

        b1 = Booking(
            animal_id=1,
            package_id=2,
            check_in_date=check_in_dates[0],
            check_out_date=check_out_dates[0],
        )
        b2 = Booking(
            animal_id=2,
            package_id=1,
            check_in_date=check_in_dates[1],
            check_out_date=check_out_dates[1],
        )
        b3 = Booking(
            animal_id=3,
            package_id=3,
            check_in_date=check_in_dates[2],
            check_out_date=check_out_dates[2],
        )
        b4 = Booking(
            animal_id=4,
            package_id=2,
            check_in_date=check_in_dates[3],
            check_out_date=check_out_dates[3],
        )

        db.session.add_all([b1, b2, b3, b4])
        db.session.commit()

        # Package
        p1 = Package(
            name="Ultra Package",
            description="Includes a comfortable bed, daily playtime, regular feeding, and medication administration as needed.",
            price_per_night=50.00,
        )
        p2 = Package(
            name="Deluxe Package",
            description="Includes A cozy sleeping area, supervised outdoor time, daily enrichment activities, and medication administration as needed.",
            price_per_night=75.00,
        )
        p3 = Package(
            name="Diamond Package",
            description="Includes Luxury sleeping accommodations, personalized attention, access to all amenities and outdoor activities, and medication administration as needed.",
            price_per_night=85.00,
        )

        db.session.add(p1)
        db.session.add(p2)
        db.session.add(p3)
        db.session.commit()

        print("Seeding finished.")

