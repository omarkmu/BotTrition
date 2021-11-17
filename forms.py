"""
Contains definitions of Flask form validators.
"""

from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    PasswordField,
    SubmitField,
    SelectField,
    DecimalField,
    DateField,
)
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


# class that uses flaskform for the profile page
class ProfileForm(FlaskForm):
    """
    Profile page where user can enter
    their personal information for the
    app to use.
    """

    gender = SelectField(
        "Gender",
        choices=[("male", "Male"), ("female", "Female"), ("other", "Other")],
        validators=[
            DataRequired(),
        ],
        render_kw={"placeholder": "Gender (Male/Female)"},
    )

    height_feet = SelectField(
        "Height (ft)",
        choices=[("4", "4'"), ("5", "5'"), ("6", "6'"), ("7", "7'")],
        validators=[
            DataRequired(),
        ],
        coerce=int,
        render_kw={"placeholder": "Height (ft)"},
    )

    height_inches = SelectField(
        "Height (in)",
        choices=[
            ("1", '1"'),
            ("2", '2"'),
            ("3", '3"'),
            ("4", '4"'),
            ("5", '5"'),
            ("6", '6"'),
            ("7", '7"'),
            ("8", '8"'),
            ("9", '9"'),
            ("10", '10"'),
            ("11", '11"'),
        ],
        coerce=int,
        validators=[
            DataRequired(),
        ],
        render_kw={"placeholder": "Height (in)"},
    )

    weight = DecimalField(
        "Weight",
        validators=[
            DataRequired(),
        ],
        render_kw={"placeholder": "Weight"},
    )

    birthdate = DateField(
        "Birthdate",
        format="%m/%d/%Y",
        validators=[
            DataRequired(),
        ],
        render_kw={"placeholder": "ex. 6/20/15"},
    )

    submit = SubmitField("Save Information")
