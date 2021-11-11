"""
The entry point of the BotTrition app.
"""

import os
import json
import flask

from flask_login import UserMixin
from flask_login import login_user, current_user, LoginManager
from flask_login.utils import login_required
from database import db
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())


app = flask.Flask(__name__, static_folder="./build/static")
# Point SQLAlchemy to your Heroku database
db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
# Gets rid of a warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.getenv("secret_key")  # don't defraud my app ok?

# it may be ideal to extract this and the above
# setup to a separate file in the future
db.init_app(app)
with app.app_context():  # app context is required when using init_app
    db.create_all()


bp = flask.Blueprint("bp", __name__, template_folder="./build")
app.register_blueprint(bp)

# main landing page when app is launched
@app.route("/", methods=["GET", "POST"])
def main():
    return flask.render_template("login.html")


@app.route("/index", methods=["GET", "POST"])
def index():
    DATA = {"your": "data here"}
    data = json.dumps(DATA)
    return flask.render_template("index.html", data=data)


# registration page to register a new user
# NOTE user cannot be verified until DB is set up and conditional statements
# will have to be updated
@app.route("/registration", methods=["GET", "POST"])
def registration():
    username = flask.request.form.get("username")

    if username:
        return flask.redirect(flask.url_for("index"))
    else:
        return flask.render_template("registration.html")



# login page to verify if a user exists
# NOTE user cannot be verified until DB is set up and conditional statements
# will have to be updated
@app.route("/login", methods=["GET", "POST"])
def login():
    username = flask.request.form.get("username")

    if username:
        return flask.render_template("profile.html")
    else:
        return flask.render_template("login.html")

if __name__ == "__main__":
    app.run(
        host=os.getenv("HOST", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True
    )
