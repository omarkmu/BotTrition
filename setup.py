"""
Handles setup of the app and its components.
"""

import os
import flask
from dotenv import load_dotenv, find_dotenv
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from database import db


load_dotenv(find_dotenv())


# Point SQLAlchemy to the Heroku database
db_url = os.getenv("DATABASE_URL")
if db_url is None:
    raise Exception("DATABASE_URL environment variable is not set")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app = flask.Flask(__name__, static_folder="./build/static")
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Gets rid of a warning
app.secret_key = os.getenv("secret_key")  # don't defraud my app ok?

db.init_app(app)
with app.app_context():  # app context is required when using init_app
    db.create_all()


bp = flask.Blueprint("bp", __name__, template_folder="./build")
app.register_blueprint(bp)

# initializing bcrypt for password hashing
bcrypt = Bcrypt(app)

# initializing login_manager to keep track of a user when logged in
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"
