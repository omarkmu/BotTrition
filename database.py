"""
Contains definitions of database models.
"""


from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class BTUser(db.Model):
    """Database model for BotTrition users."""

    __tablename__ = "btuser"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(80), nullable=False)

    restrictions = db.relationship("DietaryRestriction", backref="btuser")
    profile = db.relationship("Profile", backref="btuser", uselist=False)


# So basically the Allergies and DietaryRestriction are multivalued so our user will have
# one to many relationship with these two attributes.


class Profile(db.Model):
    """Database model for BotTrition user profile information."""

    __tablename__ = "profile"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("btuser.id"))

    gender = db.Column(db.String(80))
    height = db.Column(db.Integer)
    weight = db.Column(db.Integer)

    birth_day = db.Column(db.Integer)
    birth_month = db.Column(db.Integer)
    birth_year = db.Column(db.Integer)


class DietaryRestriction(db.Model):
    """Database model for BotTrition users' dietary restrictions."""

    __tablename__ = "dietary_restriction"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("btuser.id"))
    restriction_type = db.Column(db.String(10))  # one of "allergy", "diet"
    restriction = db.Column(db.String(80))