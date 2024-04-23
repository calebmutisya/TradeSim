from flask import request, jsonify, Blueprint, current_app
from werkzeug.security import generate_password_hash
from flask_jwt_extended import  jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename 
import os
from models import db, User
from forms import RegistrationForm

user_bp = Blueprint('user_bp', __name__)


# Fetch all users filtered by capital, ordered from highest to lowest
@user_bp.route("/users", methods=["GET"])
def get_users():
    # Query users, filter by capital, order by capital descending
    users = [user.to_dict() for user in User.query.order_by(User.capital.desc()).all()]
    return jsonify(users), 200

# add user
@user_bp.route("/addusers", methods=["POST"])
def add_users():
    data = request.json  # Get JSON data from request body

    # Extract fields from JSON data
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    

    # Check if any required fields are missing
    if not (username and email and password ):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if username or email already exist
    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({"error": "User with this email/username already exists!"}), 400

    

    # Create a new user instance
    new_user = User(email=email, password=password, username=username)

    # Add and commit the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": "User added successfully!"}), 201

#update user
@user_bp.route("/users/<int:user_id>", methods=['PATCH'])
@jwt_required()
def update_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message":"User not found"}), 404
    
    data = request.get_json()

    # Remove password field from data
    data.pop('password', None)

    # Update user attributes
    for key, value in data.items():
        setattr(user, key, value)
    db.session.commit()

    return jsonify({"message":"User updated successfully"}), 200

#delete user
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

