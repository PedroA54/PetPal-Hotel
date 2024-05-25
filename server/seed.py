from random import choice as rc
from random import randint

# Local imports
from config import app, db

# Remote library imports
from faker import Faker
from models import Package

# from server.models.models import db

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!