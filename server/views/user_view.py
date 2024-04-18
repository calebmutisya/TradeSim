from flask import request, jsonify, Blueprint
from models import db, User

user_bp = Blueprint('user_bp', __name__)


# Fetch all users filtered by capital, ordered from highest to lowest
@user_bp.route("/users", methods=["GET"])
def get_users():
    # Query users, filter by capital, order by capital descending
    users = [user.to_dict() for user in User.query.order_by(User.capital.desc()).all()]
    return jsonify(users), 200

