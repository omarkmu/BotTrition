import flask
import os
import json

from flask_login import UserMixin
from flask_login import login_user, current_user, LoginManager
from flask_login.utils import login_required
from flask_sqlalchemy import SQLAlchemy
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

db = SQLAlchemy(app)

# sample of creating table
# class Health(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80))
# db.create_all()

bp = flask.Blueprint("bp", __name__, template_folder="./build")

# main landing page when app is launched
@app.route("/", methods=["GET", "POST"])
def main():
    return flask.render_template("login.html")


@app.route("/index", methods=["GET", "POST"])
def index():
    DATA = {"your": "data here"}
    data = json.dumps(DATA)
    return flask.render_template("index.html", data=data)

app.register_blueprint(bp)

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
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8080)),
        debug=True
    )
