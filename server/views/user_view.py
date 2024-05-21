from flask import request, jsonify, Blueprint, current_app
from werkzeug.security import generate_password_hash
from flask_jwt_extended import  jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename 
import os
from models import db, User
from flask import current_app
import cloudinary.uploader

user_bp = Blueprint('user_bp', __name__)


# Fetch all users filtered by capital, ordered from highest to lowest
@user_bp.route("/users", methods=["GET"])
def get_users():
    # Query users, filter by capital, order by capital descending
    users = [user.to_dict() for user in User.query.order_by(User.capital.desc()).all()]
    return jsonify(users), 200

# Get a single users data
@user_bp.route("/singleuser", methods=["GET"])
@jwt_required()
def get_user():
    user_id= get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.to_dict()), 200

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
    
    # Hash the password
    hashed_password = generate_password_hash(password)

    # Check if username or email already exist
    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({"error": "User with this email/username already exists!"}), 400

    # Create a new user instance
    new_user = User(email=email, password=hashed_password, username=username)

    # Add and commit the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": "User added successfully!"}), 201

#update user
@user_bp.route("/users", methods=['PATCH'])
@jwt_required()
def update_user():
    current_user_id = get_jwt_identity()
    
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"message":"User not found"}), 404
    
    data = request.get_json()

    # Check for password and update if provided
    if 'password' in data:
        user.password = generate_password_hash(data['password'])
        data.pop('password', None)

    # Update user attributes
    for key, value in data.items():
        setattr(user, key, value)
    db.session.commit()

    return jsonify({"message":"User updated successfully"}), 200

@user_bp.route("/reset-password", methods=['PATCH'])
def reset_password():
    data = request.get_json()

    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Username, email, and new password are required"}), 400

    username = data['username']
    email = data['email']
    new_password = data['password']

    # Find the user with the provided username and email
    user = User.query.filter_by(username=username, email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Update the user's password
    user.password = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200



@user_bp.route("/users/capital", methods=['PATCH'])
@jwt_required()
def update_user_capital():
    current_user_id = get_jwt_identity()
    
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"message":"User not found"}), 404
    
    data = request.get_json()
    new_capital = data.get('capital')

    if new_capital is None:
        return jsonify({"error": "Missing 'capital' field in request body"}), 400

    # Update user's capital
    user.capital = new_capital
    db.session.commit()

    return jsonify({"message":"User's capital updated successfully"}), 200

#delete user
@user_bp.route("/users", methods=["DELETE"])
@jwt_required()
def delete_user():
    current_user_id = get_jwt_identity()
    
    user = User.query.get_or_404(current_user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@user_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_file():
    current_user_id = get_jwt_identity()

    if 'image' not in request.files:
        return 'No file part', 400

    file = request.files['image']
    if file.filename == '':
        return 'No selected file', 400

    if file and allowed_file(file.filename):
        # Upload the image to Cloudinary
        result = cloudinary.uploader.upload(file)

        # Get the URL of the uploaded image
        image_url = result.get('secure_url')

        # Update the profile_img field for the user
        user = User.query.get(current_user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404
        user.profile_img = image_url
        db.session.commit()

        return jsonify({"message": "File uploaded successfully", "image_url": image_url}), 200
    else:
        return 'Invalid file format', 400


