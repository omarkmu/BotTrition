"""
The entry point of the BotTrition app.
"""

import os
import json
import flask
from dotenv import load_dotenv, find_dotenv
from database import db

load_dotenv(find_dotenv())


# Point SQLAlchemy to your Heroku database
db_url = os.getenv("DATABASE_URL")
if db_url is None:
    raise Exception("DATABASE_URL environment variable is not set")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app = flask.Flask(__name__, static_folder="./build/static")
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


@app.route("/", methods=["GET", "POST"])
def main():
    """
    The main landing page that is shown when the app is launced.
    """
    return flask.render_template("login.html")


@app.route("/index", methods=["GET", "POST"])
def index():
    """
    The index page of the app.
    """

    mock_data = {"your": "data here"}
    data = json.dumps(mock_data)
    return flask.render_template("index.html", data=data)


# NOTE user cannot be verified until DB is set up and conditional statements
# will have to be updated
@app.route("/registration", methods=["GET", "POST"])
def registration():
    """
    The registration page of the app. Allows new users to
    register for an account.
    """

    username = flask.request.form.get("username")

    if username:
        return flask.redirect(flask.url_for("index"))

    return flask.render_template("registration.html")


# NOTE user cannot be verified until DB is set up and conditional statements
# will have to be updated
@app.route("/login", methods=["GET", "POST"])
def login():
    """
    The login page of the app. Allows users to
    log in to existing accounts.
    """

    username = flask.request.form.get("username")

    if username:
        return flask.render_template("profile.html")

    return flask.render_template("login.html")


if __name__ == "__main__":
    app.run(
        host=os.getenv("HOST", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True
    )
