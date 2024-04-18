from flask import request, jsonify, Blueprint
from models import db, User,Opentrades,Closedtrades

open_bp = Blueprint('open_bp', __name__)

#add a trade
@open_bp.route("/opentrades", methods=["POST"])
def add_opentrade():
    data = request.json
    new_opentrade = Opentrades(**data)
    db.session.add(new_opentrade)
    db.session.commit()
    return jsonify({"message": "Open trade added successfully"}), 201

#get all open trades
@open_bp.route("/opentrades", methods=["GET"])
def getall_opentrades():
    opentrades = Opentrades.query.all()
    return jsonify([opentrade.serialize() for opentrade in opentrades]), 200

#get a single trade
@open_bp.route('/opentrades/<int:opentrade_id>', methods=["GET"])
def getsingle_opentrade(opentrade_id):
    opentrade = Opentrades.query.get_or_404(opentrade_id)
    return jsonify(opentrade.serialize()), 200

#edit a trade
@open_bp.route("/opentrades/<int:opentrade_id>", methods=['PATCH'])
def edit_opentrade(opentrade_id):
    opentrade = Opentrades.query.get_or_404(opentrade_id)
    data = request.json
    editable_columns = ['tp', 'sl']

    # Update only the editable columns
    for key, value in data.items():
        if key in editable_columns:
            setattr(opentrade, key, value)

    db.session.commit()
    return jsonify({"message": "Open trade updated successfully"}), 200

# Edit pnl for a trade
@open_bp.route("/opentrades/<int:opentrade_id>/pnl", methods=['PATCH'])
def edit_opentrade_pnl(opentrade_id):
    opentrade = Opentrades.query.get_or_404(opentrade_id)
    data = request.json

    # Update pnl column only
    if 'pnl' in data:
        opentrade.pnl = data['pnl']
        db.session.commit()
        return jsonify({"message": "Pnl for open trade updated successfully"}), 200
    else:
        return jsonify({"error": "Pnl data not provided"}), 400


#delete a trade
@open_bp.route("/opentrades/<int:opentrade_id>", methods=["DELETE"])
def delete_opentrade(opentrade_id):
    opentrade = Opentrades.query.get_or_404(opentrade_id)
    db.session.delete(opentrade)
    db.session.commit()
    return jsonify({"message": "Open trade deleted successfully"}), 200
