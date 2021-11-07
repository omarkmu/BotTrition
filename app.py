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
db.create_all()

bp = flask.Blueprint("bp", __name__, template_folder="./build")
app.register_blueprint(bp)


@app.route("/index")
def index():
    DATA = {"your": "data here"}
    data = json.dumps(DATA)
    return flask.render_template("index.html", data=data)


if __name__ == "__main__":
    app.run(
        # host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8080)),
        debug=True
    )
