from flask import Blueprint, request, jsonify
from .googlemapAPI import validateLocation

from .extensions import mongo
from .extensions import bcrypt


main = Blueprint('main', __name__)


@main.route('/test')
def test():
    user_collection = mongo.db.users
    user_collection.insert({'email': 'random'})
    resp = jsonify(success=True)
    return resp


def CheckIfUserExists(email):
    user_collection = mongo.db.users
    user = user_collection.find_one({"email": email})
    return user


@main.route('/signup', methods=['GET', 'POST'])
def SignUp():
    return_message = "Success"
    content = request.get_json(silent=True)
    email = content.get('email')
    password = content.get('password')
    if(CheckIfUserExists(email) == None):
        mongo.db.users.insert(
            {'email': email, 'password': bcrypt.generate_password_hash(password).decode('utf-8')})
    else:
        return_message = "User Already exists"
    resp = jsonify(success=return_message)
    return resp


@main.route('/signin', methods=['GET', 'POST'])
def SignIn():
    return_message = "Success"
    content = request.get_json(silent=True)
    email = content.get('email')
    password = content.get('password')
    userResponse = CheckIfUserExists(email)
    if(userResponse == None or not bcrypt.check_password_hash(userResponse.get("password"), password)):
        return_message = "User Does Not Exist"
    resp = jsonify(success=return_message)
    return resp

@main.route('/enterLocation', methods=['GET', 'POST'])
def verifyLocation():
    return_message = "Success"
    content = request.get_json(silent=True)
    email = content.get('email')
    location = content.get('location')
    backendResponse = validateLocation(location)
    if(backendResponse == None):
        return_message = "Location Does Not Exist"
    else:
        mongo.db.users.update_one({'email': email}, {'$set': {'location': 
            {'address': backendResponse[0], 
            'lat': backendResponse[1]['lat'], 'lng': backendResponse[1]['lng']}}})
    resp = jsonify(success=return_message)
    return resp

@main.route('/addPref', methods=['GET', 'POST'])
def addPreference():
    return_message = "Success"
    content = request.get_json(silent=True)
    email = content.get('email')
    preference = content.get('preference')
    user = CheckIfUserExists(email)
    #print(user)
    user_preference = user.get('preference')
    if user_preference is None:
        mongo.db.users.update_one({'email': email}, {'$set': {'preference': preference}})
    else:
        # check if the preference already exist in the list
        new_pref = []
        for type_add in preference:
            if type_add not in user_preference:
                new_pref.append(type_add)
        update_pref = user_preference + new_pref
        mongo.db.users.update_one({'email': email}, {'$set': {'preference': update_pref}})
    return return_message
        
@main.route('/deletePref', methods=['DELETE'])
def deletePreference():
    return_message = "Success"
    content = request.get_json(silent=True)
    email = content.get('email')
    del_pre = content.get('preference')
    user = CheckIfUserExists(email)
    user_pre = user.get('preference')
    if user_pre is not None:
        for want_del in del_pre:
            if want_del in user_pre:
                user_pre.remove(want_del)
        mongo.db.users.update_one({'email': email}, {'$set': {'preference': user_pre}})
    return return_message
    