from flask import request, jsonify, Blueprint, current_app
from werkzeug.utils import secure_filename  
from models import db, User
from forms import RegistrationForm
import os

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
    form = RegistrationForm(request.form)
    if form.validate_on_submit():
        username = form.username.data
        email = form.email.data
        password = form.password.data
        profile_img = request.files['profile_img']  # Get profile image from form data

        # Check if username or email already exist
        if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
            return jsonify({"error": "User with this email/username already exists!"})

        # Save the profile image if provided
        if profile_img:
            filename = secure_filename(profile_img.filename)
            upload_folder = current_app.config['UPLOAD_FOLDER']
            profile_img.save(os.path.join(upload_folder, filename))


        # Create a new user instance
        new_user = User(email=email, password=password, username=username, profile_img=filename if profile_img else None)

        # Add and commit the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"success": "User added successfully!"}), 201

    return jsonify({"error": "Invalid form data"}), 400

#update user
@user_bp.route("/users/<int:user_id>", methods=['PATCH'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message":"User not found"}),404
    
    data=request.get_json()

    data.pop('password', None)

    for key, value in data.items():
        setattr(user,key,value)
    db.session.commit()

    return jsonify({"message":"User updated succesfully"}),200

#delete user
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

