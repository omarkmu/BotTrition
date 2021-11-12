"""
The entry point of the BotTrition app.
"""

import os
import json
import flask
from dotenv import load_dotenv, find_dotenv
from database import db, BTUser
from flask import render_template, url_for, redirect, flash
from flask_login import (
    login_user,
    LoginManager,
    login_required,
    logout_user,
)
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import (
    DataRequired,
    Length,
    ValidationError,
)
from flask_bcrypt import Bcrypt


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

# initializing bcrypt for password hashing
bcrypt = Bcrypt(app)

# initializing login_manager to keep track of a user when logged in
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

# grabs the current user logged in and stores it
@login_manager.user_loader
def load_user(user_id):
    # returns user_id from db
    return BTUser.query.get(int(user_id))


class RegisterForm(FlaskForm):
    # creates username and password fields
    username = StringField(
        "Username",
        validators=[
            DataRequired(),
            Length(min=4, max=20, message="Enter a valid username"),
        ],
        render_kw={"placeholder": "Enter username"},
    )
    password = PasswordField(
        "Password",
        validators=[
            DataRequired(),
            Length(min=4, max=20, message="Select a stronger password"),
        ],
        render_kw={"placeholder": "Enter password"},
    )

    submit = SubmitField("Register")

    # checks the data base to see if the same username exists in the db
    # if so, it tells the user to enter a new one
    def validate_username(self, username):
        existing_username = BTUser.query.filter_by(username=username.data).first()
        if existing_username:
            print("user already exists")
            raise ValidationError(
                "That username has already been taken. Please try again."
            )


# class that uses FlaskForm for user to fill out to log in
class LoginForm(FlaskForm):
    # creates username and password fields
    username = StringField(
        "Username",
        validators=[
            DataRequired(),
        ],
        render_kw={"placeholder": "Username"},
    )
    password = PasswordField(
        "Password",
        validators=[DataRequired()],
        render_kw={"placeholder": "Password"},
    )
    submit = SubmitField("Login")


@app.route("/", methods=["GET", "POST"])
@login_required
def main():
    """
    The main landing page that is shown when the app is launced.
    """
    return flask.render_template("profile.html")


@app.route("/index", methods=["GET", "POST"])
@login_required
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
    form = RegisterForm()

    # checks the input to see if the username and password are valid
    if form.username.data is None:
        flash("")
    elif len(form.username.data) < 4:
        flash("Please enter a username that has more than 4 characters")
    elif len(form.username.data) > 20:
        flash("Please enter a username that is less than 20 characters")
    elif len(form.password.data) < 4:
        flash("Please enter a password greater than 4 characters")
    elif len(form.password.data) > 20:
        flash("Please enter a password shorter than 20 characters")

    # hashes password and stores it in the db
    if form.validate_on_submit():
        pw_hash = bcrypt.generate_password_hash(form.password.data).decode("utf-8")
        new_user = BTUser(username=form.username.data, password_hash=pw_hash)
        db.session.add(new_user)
        db.session.commit()
        print("redirected")
        flash("Account Created!")
        return redirect(url_for("login"))

    return render_template("registration.html", form=form)


# NOTE user cannot be verified until DB is set up and conditional statements
# will have to be updated
@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()

    # checks to see if both inputs are valid
    if form.validate_on_submit():
        db_user = BTUser.query.filter_by(username=form.username.data).first()
        print("user entered both values")
        # checks to see if user is valid
        if db_user:
            # checks to see if passwords match
            if bcrypt.check_password_hash(db_user.password_hash, form.password.data):
                print("valid password")
                login_user(db_user)
                return flask.redirect(flask.url_for("index"))
            # if passwords do not match, return error
            else:
                print("incorrect")
                flash("Incorrect username or password")
                return redirect(url_for("login"))
        else:
            flash("Incorrect username or password")
    return flask.render_template("login.html", form=form)


# logs user out
@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(
        host=os.getenv("HOST", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True
    )
