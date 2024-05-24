from flask import Flask, jsonify, request
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db,User,Opentrades,Closedtrades

from views import *
from flask_jwt_extended import JWTManager

import os

import cloudinary
import cloudinary.uploader
import cloudinary.api
import psycopg2

app = Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
# Update the database URI to use PostgreSQL
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://avnadmin:AVNS_2gkbkUa2LzKS3uCz9X6@pg-32d7ed7-tradesim.c.aivencloud.com:26085/defaultdb?sslmode=require'

CORS(app)

db.init_app(app)
migrate = Migrate(app, db)

# Set your Cloudinary credentials
cloudinary.config(
  cloud_name = 'dxi0bnriw',
  api_key = '496475473161481',
  api_secret = 'I2rO8XBiXAlYLnliHXSIXYdjwSI'
)

jwt = JWTManager()
app.config["JWT_SECRET_KEY"] = "fjhjdjhfiskyfvdgvydklvsrfl"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt.init_app(app)

# Set secret key for Flask-WTF
app.config['SECRET_KEY'] = '1396f8e2aa42a3ad4142ef2617691495'


app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(open_bp)
app.register_blueprint(close_bp)
app.register_blueprint(mkt_bp)

@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header, jwt_data):
    jti = jwt_data['jti']
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    if token:
        return token 
    else:
        return None

# Example route to check database version
@app.route('/db_version')
def get_db_version():
    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(app.config["SQLALCHEMY_DATABASE_URI"])
        cur = conn.cursor()
        
        # Execute query
        cur.execute('SELECT VERSION()')
        version = cur.fetchone()[0]
        
        # Close connection
        cur.close()
        conn.close()
        
        return jsonify({"db_version": version})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)