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
    NumberRange,
    ValidationError,
)
from database import BTUser
from setup import bcrypt


class RegisterForm(FlaskForm):
    """
    Register form created with FlaskForm.
    Validates input data from the frontend.
    """

    username = StringField(
        validators=[
            DataRequired(message="Please enter a username."),
            Length(
                min=4,
                message="Username must be at least 4 characters in length.",
            ),
            Length(
                max=20,
                message="Username cannot be more than 20 characters in length.",
            ),
        ],
    )

    password = PasswordField(
        validators=[
            DataRequired(message="Please enter a password."),
            Length(
                min=4,
                message="Password must be at least 4 characters in length.",
            ),
            Length(
                max=20,
                message="Password cannot be more than 20 characters in length.",
            ),
        ],
    )

    submit = SubmitField()

    @staticmethod
    def validate_username(_, username):
        """
        Checks the database for an existing user with the same username.
        If such a user exists, validation fails.
        """
        existing_username = BTUser.query.filter_by(username=username.data).first()
        if existing_username:
            raise ValidationError(
                "That username has already been taken. Please try again."
            )


class LoginForm(FlaskForm):
    """
    Login form created with FlaskForm.
    Validates login information from the frontend.
    """

    username = StringField(
        validators=[DataRequired(message="Please enter a username.")]
    )

    password = PasswordField(
        validators=[DataRequired(message="Please enter a password.")]
    )

    submit = SubmitField()

    def validate_on_submit(self):
        """
        Checks the database for a user with the specified username and password.
        If such a user doesn't exist, validation fails.
        """

        validation_result = super().validate_on_submit()
        if not validation_result:
            return validation_result

        user = BTUser.query.filter_by(username=self.username.data).first()
        if not user:
            self.username.errors.append(
                "There's no user with that username. Did you mean to sign up?"
            )
            return False

        if not bcrypt.check_password_hash(user.password_hash, self.password.data):
            self.password.errors.append("Incorrect password.")
            return False

        return True


class ProfileForm(FlaskForm):
    """
    Profile form which allows the user to enter
    their personal information for the app to use.
    """

    gender = SelectField(
        choices=[("male", "Male"), ("female", "Female"), ("other", "Non-Binary")],
        validators=[DataRequired()],
    )

    height_feet = SelectField(
        coerce=int,
        choices=[("4", "4'"), ("5", "5'"), ("6", "6'"), ("7", "7'")],
        validators=[DataRequired()],
    )

    height_inches = SelectField(
        coerce=int,
        choices=[
            ("12", '0"'),
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
        validators=[DataRequired()],
    )

    weight = DecimalField(
        validators=[
            DataRequired(),
            NumberRange(min=1, message="Weight must be greater than zero."),
        ]
    )

    birthdate = DateField(validators=[DataRequired()])

    submit = SubmitField()

    @staticmethod
    def validate_birthdate(_, birthdate):
        """
        Checks the birth date to confirm its validity.
        All dates during or after the year 1900 are considered valid.
        """

        if birthdate.data.year < 1900:  # oldest person alive currently was born in 1903
            raise ValidationError("Please enter a valid birth date.")
