"""
Contains definitions of Flask form validators.
"""

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import (
    DataRequired,
    Length,
    ValidationError,
)
from database import BTUser


class RegisterForm(FlaskForm):
    """
    Register form from FlaskForm.
    Allows the input data to be pulled from front
    and have requirements.
    """

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
    @staticmethod
    def validate_username(_, username):
        """
        Validated username by checking database
        """
        existing_username = BTUser.query.filter_by(username=username.data).first()
        if existing_username:
            print("user already exists")
            raise ValidationError(
                "That username has already been taken. Please try again."
            )


# class that uses FlaskForm for user to fill out to log in
class LoginForm(FlaskForm):
    """
    Login form created with FlaskForm.
    This allows us to pass inputs/outputs
    back and forth.
    """

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
