from flask import request, jsonify, Blueprint
from models import db, User,Opentrades,Closedtrades


close_bp = Blueprint('close_bp', __name__)

#get all closed trades for a user filter by showing the latest trade first
@close_bp.route("/closedtrades/<int:user_id>", methods=["GET"])
def get_all(user_id):
    closed_trades = Closedtrades.query.filter_by(user_id=user_id).order_by(Closedtrades.open_date.desc()).all()
    return jsonify([trade.serialize() for trade in closed_trades]), 200

