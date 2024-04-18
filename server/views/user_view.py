from flask import request, jsonify, Blueprint
from models import db, User

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
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    check_username = User.query.filter_by(username=username).first()
    check_email = User.query.filter_by(email=email).first()
    

    if check_username or check_email :
        return jsonify({"error": "User email/username/phone already exist!"})

    else:
        new_user = User(email=email, password=password, username=username)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"success": "User added successfully!"}), 201

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

