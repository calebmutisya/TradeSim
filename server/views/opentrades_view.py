from flask import request, jsonify, Blueprint
from models import db, User,Opentrades

open_bp = Blueprint('open_bp', __name__)

#add a trade
@open_bp.route("/opentrades", methods=["POST"])
def add_opentrade():
    data = request.json
    new_opentrade = Opentrades(
        user_id=data.get('user_id'),
        currency_pair=data.get('currency_pair'),
        position=data.get('position'),
        tp=data.get('tp'),
        ep=data.get('ep'),
        sl=data.get('sl'),
        lot=data.get('lot'),
        pnl=data.get('pnl'),
        open_date=data.get('open_date')
    )
    db.session.add(new_opentrade)
    db.session.commit()
    return jsonify({"message": "Trade added successfully", "id": new_opentrade.id}), 201


#get all open trades
@open_bp.route("/opentrades", methods=["GET"])
def get_all_opentrades():
    all_opentrades = Opentrades.query.all()
    serialized_opentrades = [opentrade.to_dict() for opentrade in all_opentrades]
    return jsonify(serialized_opentrades), 200

# Get all open trades for a specific user
@open_bp.route("/opentrades/user/<int:user_id>", methods=["GET"])
def get_user_opentrades(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_opentrades = Opentrades.query.filter_by(user_id=user_id).all()
    serialized_opentrades = [opentrade.to_dict() for opentrade in user_opentrades]
    return jsonify(serialized_opentrades), 200


#get a single trade
@open_bp.route('/opentrades/<int:opentrade_id>', methods=["GET"])
def get_single_opentrade(opentrade_id):
    opentrade = Opentrades.query.get(opentrade_id)
    if not opentrade:
        return jsonify({"error": "Trade not found"}), 404
    return jsonify(opentrade.to_dict()), 200

#edit a trade
@open_bp.route("/opentrades/<int:opentrade_id>", methods=['PATCH'])
def edit_opentrade(opentrade_id):
    opentrade = Opentrades.query.get(opentrade_id)
    if not opentrade:
        return jsonify({"error": "Trade not found"}), 404
    data = request.json
    opentrade.currency_pair = data.get('currency_pair', opentrade.currency_pair)
    opentrade.position = data.get('position', opentrade.position)
    opentrade.tp = data.get('tp', opentrade.tp)
    opentrade.ep = data.get('ep', opentrade.ep)
    opentrade.sl = data.get('sl', opentrade.sl)
    opentrade.lot = data.get('lot', opentrade.lot)
    opentrade.pnl = data.get('pnl', opentrade.pnl)
    opentrade.open_date = data.get('open_date', opentrade.open_date)
    db.session.commit()
    return jsonify({"message": "Trade updated successfully"}), 200

# Edit pnl for a trade
@open_bp.route("/opentrades/<int:opentrade_id>/pnl", methods=['PATCH'])
def edit_opentrade_pnl(opentrade_id):
    opentrade = Opentrades.query.get(opentrade_id)
    if not opentrade:
        return jsonify({"error": "Trade not found"}), 404
    data = request.json
    opentrade.pnl = data.get('pnl', opentrade.pnl)
    db.session.commit()
    return jsonify({"message": "Trade pnl updated successfully"}), 200

#delete a trade
@open_bp.route("/opentrades/<int:opentrade_id>", methods=["DELETE"])
def delete_opentrade(opentrade_id):
    opentrade = Opentrades.query.get(opentrade_id)
    if not opentrade:
        return jsonify({"error": "Trade not found"}), 404
    db.session.delete(opentrade)
    db.session.commit()
    return jsonify({"message": "Trade deleted successfully"}), 200
