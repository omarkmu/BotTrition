"""
The entry point of the BotTrition app.
"""

import os
import json
import flask
from flask import render_template, url_for, redirect, flash
from flask_login import (
    login_user,
    login_required,
    logout_user,
)
from setup import app, bcrypt
from database import db, BTUser, Profile
from forms import LoginForm, RegisterForm, ProfileForm
from fdc import search


@app.route("/", methods=["GET", "POST"])
@login_required
def main():
    """
    The main landing page that is shown when the app is launced.
    """
    return flask.render_template("index.html")


@app.route("/index", methods=["GET", "POST"])
@login_required
def index():
    """
    The index page of the app.
    """
    mock_data = {"your": "data here"}
    data = json.dumps(mock_data)
    return flask.render_template("index.html", data=data)


@app.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    """
    The profile page of the app.
    """
    form = ProfileForm()

    height_feet = form.height_feet.data
    height_inches = form.height_inches.data

    print(form.birthdate.data)
    print(form.gender.data)
    print(form.height_feet.data)
    print(form.height_inches.data)
    if height_feet is not None:
        height = (int(height_feet) * 12) + int(height_inches)
        print(height)

    if form.validate_on_submit():
        user_profile = Profile(
            gender=form.gender.data,
            height=height,
            weight=form.weight.data,
        )
        db.session.add(user_profile)
        db.session.commit()
        print("User updated")
        flash("Profile Updated!")
        return redirect(url_for("profile"))

    return render_template("profile.html", form=form)


# NOTE user cannot be verified until DB is set up and conditional statements
# will have to be updated
@app.route("/registration", methods=["GET", "POST"])
def registration():
    """
    The registration page of the app. Allows new users to
    register for an account.
    """
    form = RegisterForm()

    # checks the input to see if the username and password are valid
    if form.username.data is None:
        flash("Please enter a username")
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
        new_user = BTUser(
            username=form.username.data, password_hash=pw_hash, profile=Profile()
        )
        db.session.add(new_user)
        db.session.commit()
        print("redirected")
        flash("Account Created!")
        return redirect(url_for("login"))

    return render_template("registration.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    """
    The login page of the app. Allows new users to
    login with their account.
    """
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
            print("incorrect")
            flash("Incorrect username or password")
            return redirect(url_for("index"))
    return flask.render_template("login.html", form=form)


@app.route("/api/search", methods=["GET", "POST"])
def api():
    """
    The search route to handle search requests for the main
    app page.Allows users to view food data from the USDA API.
    """
    food_input = flask.request.json.get("food_input")
    output = search(food_input)
    return flask.jsonify(output)


# logs user out
@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    """
    Logs the user out.
    """
    logout_user()
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(
        host=os.getenv("HOST", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True
    )
