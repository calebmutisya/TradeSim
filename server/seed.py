from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db,User,Opentrades,Closedtrades
from datetime import datetime

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
db.init_app(app)

def seed_user():
    # Create 4 dummy users
    users_data = [
        {'username': 'user1', 'email': 'user1@example.com', 'password': 'password1', 'capital': 10000},
        {'username': 'user2', 'email': 'user2@example.com', 'password': 'password2', 'capital': 20000},
        {'username': 'user3', 'email': 'user3@example.com', 'password': 'password3', 'capital': 15000},
        {'username': 'user4', 'email': 'user4@example.com', 'password': 'password4', 'capital': 30000}
    ]
    
    for user_data in users_data:
        user = User(**user_data)
        db.session.add(user)
    
    db.session.commit()

def seed_opentrades():
    # Create 3 open trades for each user
    users = User.query.all()
    
    for user in users:
        for _ in range(3):
            trade = Opentrades(
                user_id=user.id,
                currency_pair='EUR-USD',
                position='BUY',
                tp=1.15,
                ep=1.10,
                sl=1.05,
                lot=1,
                pnl=None,
                open_date=datetime.now()
            )
            db.session.add(trade)
    
    db.session.commit()

def seed_closedtrades():
    # Create 3 closed trades for each user
    users = User.query.all()
    
    for user in users:
        for _ in range(3):
            trade = Closedtrades(
                user_id=user.id,
                currency_pair='EUR-USD',
                position='BUY',
                tp=1.15,
                ep=1.10,
                sl=1.05,
                lot=1,
                pnl=50,
                open_date=datetime.now()
            )
            db.session.add(trade)
    
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed_user()
        seed_opentrades()
        seed_closedtrades()
