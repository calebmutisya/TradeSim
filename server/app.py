from flask import Flask, jsonify, request
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db,User,Opentrades,Closedtrades

from views import *
from flask_jwt_extended import JWTManager

import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
app.config['UPLOAD_FOLDER'] = './imguploads'
db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager()
app.config["JWT_SECRET_KEY"] = "fjhjdjhfiskyfvdgvydklvsrfl"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt.init_app(app)


app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(open_bp)
app.register_blueprint(close_bp)

@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header, jwt_data):
    jti = jwt_data['jti']
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    if token:
        return token 
    else:
        return None

if __name__ == '__main__':
    app.run(port=5000, debug=True)