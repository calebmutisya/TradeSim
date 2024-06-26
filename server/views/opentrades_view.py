from flask import request, jsonify, Blueprint
from models import db, User,Opentrades
from flask_jwt_extended import  jwt_required, get_jwt_identity


open_bp = Blueprint('open_bp', __name__)

#add a trade
@open_bp.route("/opentrades", methods=["POST"])
@jwt_required()
def add_opentrade():
    current_user_id = get_jwt_identity()

    data = request.json
    new_opentrade = Opentrades(
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
    db.session.add(new_opentrade)
    db.session.commit()
    return jsonify({"message": "Trade added successfully"}), 200


#get all open trades
@open_bp.route("/opentrades", methods=["GET"])
def get_all_opentrades():
    all_opentrades = Opentrades.query.all()
    serialized_opentrades = [opentrade.to_dict() for opentrade in all_opentrades]
    return jsonify(serialized_opentrades), 200

# Get all open trades for a specific user
@open_bp.route("/opentrades/user", methods=["GET"])
@jwt_required()
def get_user_opentrades():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user_opentrades = Opentrades.query.filter_by(user_id=current_user_id).all()
    serialized_opentrades = [opentrade.to_dict() for opentrade in user_opentrades]
    return jsonify(serialized_opentrades), 200


#get a single trade
@open_bp.route('/opentrades/<int:opentrade_id>', methods=["GET"])
@jwt_required()
def get_single_opentrade(opentrade_id):
    opentrade = Opentrades.query.get(opentrade_id)
    if not opentrade:
        return jsonify({"error": "Trade not found"}), 404
    return jsonify(opentrade.to_dict()), 200

#edit a trade
@open_bp.route("/opentrades/<int:opentrade_id>", methods=['PATCH'])
@jwt_required()
def edit_opentrade(opentrade_id):
    opentrade = Opentrades.query.get(opentrade_id)
    if not opentrade:
        return jsonify({"error": "Trade not found"}), 404
    data = request.json
    if 'tp' in data:
        opentrade.tp = data['tp']  # Update take profit
    if 'sl' in data:
        opentrade.sl = data['sl']  # Update stop loss
    db.session.commit()
    return jsonify({"message": "Trade updated successfully"}), 200

# Edit pnl for a trade
@open_bp.route("/opentrades/<int:opentrade_id>/pnl", methods=['PATCH'])
@jwt_required()
def edit_opentrade_pnl(opentrade_id):
    opentrade = Opentrades.query.get(opentrade_id)
    if not opentrade:
        return jsonify({"error": "Trade not found"}), 404
    data = request.json
    opentrade.pnl = data.get('pnl', opentrade.pnl)
    db.session.commit()
    return jsonify({"message": "Trade pnl updated successfully"}), 200

# Edit mp for a trade
@open_bp.route("/opentrades/<int:opentrade_id>/mp", methods=['PATCH'])
@jwt_required()
def edit_opentrade_mp(opentrade_id):
    opentrade = Opentrades.query.get(opentrade_id)
    if not opentrade:
        return jsonify({"error": "Trade not found"}), 404
    data = request.json
    opentrade.mp = data.get('mp', opentrade.mp)
    db.session.commit()
    return jsonify({"message": "Trade mp updated successfully"}), 200

#delete a trade
@open_bp.route("/opentrades/<int:opentrade_id>", methods=["DELETE"])
def delete_opentrade(opentrade_id):
    opentrade = Opentrades.query.get(opentrade_id)
    if not opentrade:
        return jsonify({"error": "Trade not found"}), 404
    db.session.delete(opentrade)
    db.session.commit()
    return jsonify({"message": "Trade deleted successfully"}), 200

# Delete all open trades for the authenticated user
@open_bp.route("/opentrades/user", methods=["DELETE"])
@jwt_required()
def delete_user_opentrades():
    current_user_id = get_jwt_identity()
    user_opentrades = Opentrades.query.filter_by(user_id=current_user_id).all()
    
    if not user_opentrades:
        return jsonify({"message": "No open trades found for the user"}), 404
    
    for opentrade in user_opentrades:
        db.session.delete(opentrade)
    
    db.session.commit()
    return jsonify({"message": "All open trades for the user have been deleted successfully"}), 200