from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import func
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Enum

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('open_trades','closed_trades')
    id= db.Column(db.Integer, primary_key=True)
    username= db.Column(db.String(80),nullable=False ,unique=True)
    email= db.Column(db.String(120),nullable=False ,unique=True)
    password = db.Column(db.String, nullable=False)
    capital=db.Column(db.Integer, default=10000)
    firstname= db.Column(db.String(64), nullable=True)
    lastname= db.Column(db.String(64), nullable=True)
    profile_img= db.Column(db.LargeBinary, nullable=True)


class Opentrades(db.Model, SerializerMixin):
    __tablename__='open_trades'

    serialize_rules = ('user',)
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


class Closedtrades(db.Model, SerializerMixin):
    __tablename__='closed_trades'

    serialize_rules = ('user',)
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

