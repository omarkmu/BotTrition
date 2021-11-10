from sqlalchemy.orm import backref
from app import db


class Btowner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password_hash = db.Column(db.String(80))
    foodAllergies = db.relationship("Allergies", backref="food_allergies")
    dietaryrestriction = db.relationship("DietaryRestriction", backref="food_dietary")
    ownerage = db.relationship("Age", backref="user_age", uselist=False)
    profileData = db.relationship("Profile", backref="user_data", uselist=False)


# So basically the Allergies and DietaryRestriction are multivalued so our user will have one to many relationship with these two attributes.
# With the Age and profile  user has one to one relationship since every user have age.


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(80))
    height = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    user_data = db.Column(db.Integer, db.ForeignKey("btowner.id"))


class Allergies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    users_food_allergies = db.Column(db.Integer, db.ForeignKey("btowner.id"))


class DietaryRestriction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    users_food_dietary = db.Column(db.Integer, db.ForeignKey("btowner.id"))


class Age(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.Integer)
    month = db.Column(db.Integer)
    year = db.Column(db.Integer)
    user_calculated_age = db.Column(db.Integer, db.ForeignKey("user.id"))


db.create_all()
