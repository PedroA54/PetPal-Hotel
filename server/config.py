# Remote library imports
from os import environ
from dotenv import load_dotenv
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Load environment variables from .env file
load_dotenv(".env")

# Instantiate app, set attributes
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///pet_hotel.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Set the secret key for session management
app.secret_key = environ.get("SESSION_SECRET")

bcrypt = Bcrypt(app)
api = Api(app)
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate CORS
CORS(app)

# Define your API resources and routes here

if __name__ == '__main__':
    app.run(port=environ.get("FLASK_RUN_PORT", 5555), debug=environ.get("FLASK_DEBUG", False))