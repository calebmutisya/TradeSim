from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import func
from datetime import datetime
from sqlalchemy import Enum

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id= db.Column(db.Integer, primary_key=True)
    username= db.Column(db.String(80),nullable=False ,unique=True)
    email= db.Column(db.String(120),nullable=False ,unique=True)
    password = db.Column(db.String, nullable=False)
    capital=db.Column(db.Integer, default=10000)
    firstname= db.Column(db.String(64), nullable=True)
    lastname= db.Column(db.String(64), nullable=True)
    profile_img= db.Column(db.String(255), nullable=True)

    # Define relationship with Opentrades
    opentrades = db.relationship('Opentrades', backref='user', cascade="all, delete-orphan", passive_deletes=True)
    # Define relationship with Closedtrades
    closedtrades = db.relationship('Closedtrades', backref='user', cascade="all, delete-orphan", passive_deletes=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "capital": self.capital,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "profile_img": self.profile_img,
        }



class Opentrades(db.Model):
    __tablename__='open_trades'

    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id',ondelete="CASCADE"), nullable=False)
    currency_pair=db.Column(db.String(50), nullable=False)
    position = db.Column(Enum('BUY', 'SELL', name='position_type'))
    tp=db.Column(db.Integer, nullable=True)
    ep=db.Column(db.Integer, nullable=False)
    sl=db.Column(db.Float, nullable=True)
    lot=db.Column(db.Integer, nullable=False)
    pnl=db.Column(db.Float, nullable=True)
    open_date = db.Column(db.DateTime, default=func.now(), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "currency_pair": self.currency_pair,
            "position": self.position,
            "tp": self.tp,
            "ep": self.ep,
            "sl": self.sl,
            "lot": self.lot,
            "pnl": self.pnl,
            "open_date": self.open_date.strftime('%Y-%m-%d %H:%M:%S')
        }


class Closedtrades(db.Model):
    __tablename__='closed_trades'

    id=db.Column(db.Integer,primary_key=True)
    user_id=db.Column(db.Integer,db.ForeignKey('users.id',ondelete="CASCADE"), nullable=False)
    currency_pair=db.Column(db.String(50))
    position=db.Column(db.String, nullable=False)
    tp=db.Column(db.Integer, nullable=True)
    ep=db.Column(db.Integer, nullable=False)
    sl=db.Column(db.Float, nullable=True)
    lot=db.Column(db.Integer, nullable=False)
    pnl=db.Column(db.Float, nullable=False)
    open_date = db.Column(db.DateTime, default=func.now(), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "currency_pair": self.currency_pair,
            "position": self.position,
            "tp": self.tp,
            "ep": self.ep,
            "sl": self.sl,
            "lot": self.lot,
            "pnl": self.pnl,
            "open_date": self.open_date.strftime('%Y-%m-%d %H:%M:%S')
        }

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti =  db.Column(db.String(100),nullable=True)
    created_at = db.Column(db.DateTime(), default=func.now())