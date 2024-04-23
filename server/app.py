from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db,User,Opentrades,Closedtrades

from views import *

import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
app.config['UPLOAD_FOLDER'] = './imguploads'
db.init_app(app)
migrate = Migrate(app, db)


app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(open_bp)
app.register_blueprint(close_bp)


if __name__ == '__main__':
    app.run(port=5000, debug=True)