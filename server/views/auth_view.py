from flask import request, jsonify, Blueprint
from models import db, User,TokenBlocklist
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt

auth_bp = Blueprint('auth_bp', __name__)

#get logged in user
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    
    user = User.query.filter_by(username = username).first()

    if user:
        if check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.id)
            return jsonify(access_token = access_token)
        
        return jsonify({"error": "Wrong Password!"}), 401

    else:
        return jsonify({"error": "User doesn't exist!"}), 404
    

# Get logged in user
@auth_bp.route("/authenticated_user", methods=["GET"])
@jwt_required()
def authenticated_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        user_data = user.to_dict()
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404
    

#Logout User
@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jwt_token = get_jwt()
    jti = jwt_token['jti']
    token_b = TokenBlocklist(jti=jti)
    db.session.add(token_b)
    db.session.commit()
    return jsonify({"success": "Logged out successfully!"}), 200


#Reset password
@auth_bp.route("/reset_password", methods=["POST"])
def reset_password():
    data=request.get_json()
    username=data.get('username')
    email=data.get('email')
    new_password=data.get('new_password')

    user=User.query.filter_by(username=username, email=email).first()

    if user:
        #Update the password
        user.password= generate_password_hash(new_password)
        db.session.commit()

        return jsonify({"message":"Password reset succesfully"}),200
    else:
        return jsonify({"error":"Invalid username or email"}), 404