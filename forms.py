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

    username = StringField(
        validators=[
            DataRequired(),
            Length(
                min=4,
                max=20,
                message="Username must be between 4 and 20 characters in length",
            ),
        ],
    )
    password = PasswordField(
        validators=[
            DataRequired(),
            Length(
                min=4,
                max=20,
                message="Password must be between 4 and 20 characters in length",
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
    This allows us to pass inputs/outputs
    back and forth.
    """

    username = StringField(validators=[DataRequired()])
    password = PasswordField(validators=[DataRequired()])
    submit = SubmitField()


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
            ("0", '0"'),
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

    weight = DecimalField(validators=[DataRequired()])
    birthdate = DateField(validators=[DataRequired()])

    submit = SubmitField()
