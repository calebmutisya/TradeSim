from flask import request, jsonify, Blueprint
from models import db, User,Opentrades,Closedtrades
from flask_jwt_extended import  jwt_required, get_jwt_identity



close_bp = Blueprint('close_bp', __name__)

#get all closed trades for a user filter by showing the latest trade first
@close_bp.route("/closedtrades", methods=["GET"])
@jwt_required()
def get_all_closed_trades(user_id):
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    closed_trades = Closedtrades.query.filter_by(user_id=current_user_id).order_by(Closedtrades.open_date.desc()).all()

    if not closed_trades:
        return jsonify({"message": "No closed trades for this user"}), 200

    serialized_trades = [trade.to_dict() for trade in closed_trades]
    return jsonify(serialized_trades), 200

