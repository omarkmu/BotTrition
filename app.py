"""
The entry point of the BotTrition app.
"""

import os
import flask
from flask import flash
from flask_login import current_user, login_user, login_required, logout_user
from setup import app, bcrypt, csrf
from database import db, BTUser, Profile
from forms import LoginForm, RegisterForm, ProfileForm
from fdc import search


def render(**kwargs):
    """
    Renders the page that handles routing on the frontend.
    """

    return flask.render_template("index.html", **kwargs)


def redirect(route):
    """
    Handles redirection to a route.
    """
    return flask.redirect(flask.url_for(route))


@app.route("/")
def main():
    """
    The main landing page that is shown when the app is launced.
    """
    if current_user.is_authenticated:  # avoid "must login" message
        return redirect("index")
    return render("login")


@app.route("/app")
@login_required
def index():
    """
    The main page of the app.
    """
    # NOTE: left this here because we may need it for favorites
    data = {"your": "data here"}
    return render(data=data)



@app.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    """
    The profile page of the app.
    """

    if flask.request.method == "GET":
        return render(data=current_user.profile.json)

    form = ProfileForm()

    if not form.validate_on_submit():
        return render(data=current_user.profile.json, form=form)

    # delete existing profile (loop just in case)
    for existing_profile in Profile.query.filter_by(user_id=current_user.id):
        db.session.delete(existing_profile)

    # update profile information
    height_feet = form.height_feet.data or 0
    height_inches = form.height_inches.data or 0

    updated_profile = Profile(
        user_id=current_user.id,
        gender=form.gender.data,
        height=height_feet * 12 + (height_inches % 12),  # mod to convert 12 to 0
        weight=form.weight.data,
        birth_year=form.birthdate.data.year,
        birth_month=form.birthdate.data.month,
        birth_day=form.birthdate.data.day,
    )

    db.session.add(updated_profile)
    db.session.commit()

    flash("Profile Updated!")
    return redirect("profile")


@app.route("/registration", methods=["GET", "POST"])
def registration():
    """
    The registration page of the app. Allows new users to
    register for an account.
    """

    if flask.request.method == "GET":
        return render()

    form = RegisterForm()

    if not form.validate_on_submit():
        return render(form=form)

    # hashes password and stores it in the db
    pw_hash = bcrypt.generate_password_hash(form.password.data).decode("utf-8")
    new_user = BTUser(
        username=form.username.data, password_hash=pw_hash, profile=Profile()
    )
    db.session.add(new_user)
    db.session.commit()

    flash("Account Created!")
    return redirect("login")


@app.route("/login", methods=["GET", "POST"])
def login():
    """
    The login page of the app. Allows new users to
    login with their account.
    """

    if flask.request.method == "GET":
        return render()

    form = LoginForm()

    # checks to see if both inputs are valid
    if not form.validate_on_submit():
        return render(form=form)

    # already checked validity in form validator, so just grab the user
    db_user = BTUser.query.filter_by(username=form.username.data).first()

    # username and password are valid; log in and redirect
    login_user(db_user)
    return redirect("index")


@app.route("/api/search", methods=["POST"])
@csrf.exempt  # fixes the "bad request" error
def api_search():
    """
    The search route to handle search requests for the main
    app page. Allows users to view food data from the USDA API.
    """
    if flask.request.json is None:
        return flask.jsonify({"error": "invalid request"})

    food_input = flask.request.json.get("food_input")
    output = search(food_input)
    return flask.jsonify(output)


@app.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    """
    Logs the user out.
    """
    logout_user()
    return redirect("login")


if __name__ == "__main__":
    app.run(
        host=os.getenv("HOST", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True
    )
