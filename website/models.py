from . import db
from flask_login import UserMixin

#obs:desenvolver mais quando implentar as açoes 
class AccountData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(100))
    first_name = db.Column(db.String(150))
    finances = db.relationship('AccountData')