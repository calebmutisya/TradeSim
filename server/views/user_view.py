from flask import request, jsonify, Blueprint
from models import db, User

user_bp = Blueprint('user_bp', __name__)

#add users
@user_bp.route("/users", methods=["POST"])
def add_users():
    data = request.json
    new_user = User(**data)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully"}), 201


# Fetch all users filtered by capital, ordered from highest to lowest
@user_bp.route("/users", methods=["GET"])
def get_users():
    users = User.query.order_by(User.capital.desc()).all()
    return jsonify([user.serialize() for user in users]), 200

#fetch single user
@user_bp.route('/users/<int:user_id>', methods=["GET"])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.serialize()), 200

#update user
@user_bp.route("/users/<int:user_id>", methods=['PATCH'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    for key, value in data.items():
        setattr(user, key, value)
    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

#delete user
@user_bp.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


