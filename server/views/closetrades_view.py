from flask import request, jsonify, Blueprint
from models import db, User,Closedtrades
from flask_jwt_extended import  jwt_required, get_jwt_identity


close_bp = Blueprint('close_bp', __name__)

#add a closed trade
@close_bp.route("/closedtrades", methods=["POST"])
@jwt_required()
def add_closedtrade():
    current_user_id = get_jwt_identity()

    data = request.json
    new_closedtrade = Closedtrades(
        user_id=current_user_id,
        currency_pair=data.get('currency_pair'),
        position=data.get('position'),
        tp=data.get('tp'),
        ep=data.get('ep'),
        sl=data.get('sl'),
        lot=data.get('lot'),
        pnl=data.get('pnl'),
        open_date=data.get('open_date')
    )
    db.session.add(new_closedtrade)
    db.session.commit()
    return jsonify({"message": "Trade added successfully", "id": new_closedtrade.id}), 201


#get all closed trades for a user filter by showing the latest trade first
@close_bp.route("/closedtrades", methods=["GET"])
@jwt_required()
def get_all_closed_trades():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    closed_trades = Closedtrades.query.filter_by(user_id=current_user_id).order_by(Closedtrades.open_date.desc()).all()

    if not closed_trades:
        return jsonify({"message": "No closed trades for this user"}), 200

    serialized_trades = [trade.to_dict() for trade in closed_trades]
    return jsonify(serialized_trades), 200

# Get all closed trades for a user filter by showing the latest trade first
@close_bp.route("/closedtrades/<int:user_id>", methods=["GET"])
def get_closed_trades_by_user_id(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    closed_trades = Closedtrades.query.filter_by(user_id=user_id).order_by(Closedtrades.open_date.desc()).all()

    if not closed_trades:
        return jsonify({"message": "No closed trades for this user"}), 200

    serialized_trades = [trade.to_dict() for trade in closed_trades]
    return jsonify(serialized_trades), 200