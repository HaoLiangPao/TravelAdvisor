import os,sys
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(CURRENT_DIR))

from flask import Blueprint, request, jsonify
from .googlemapAPI import validateLocation
from .googlemapAPI import crawlLocations
from .googlemapAPI import parsingLocation

from .extensions import mongo
from .extensions import bcrypt

from .Models.user import User
from .Models.Location import Location

import random
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
    user = User(email, password)
    try:
        user.createAccount()
    except ValueError:
        return_message = "Password Does Not Exist"
    resp = jsonify(success=return_message)
    return resp


@main.route('/signin', methods=['GET', 'POST'])
def SignIn():
    return_message = "Success"
    content = request.get_json(silent=True)
    email = content.get('email')
    password = content.get('password')
    user = User(email, password)
    try:
        if(user.checkIfUserExists() == None):
            return_message = "User Does Not Exist"
    except ValueError:
        return_message = "Password Does Not Exist"
    resp = jsonify(success=return_message)
    return resp

@main.route('/enterLocation', methods=['GET', 'POST'])
def verifyLocation():
    return_message = "Success"
    content = request.get_json(silent=True)
    email = content.get('email')
    inputLocation = content.get('location')
    backendResponse = validateLocation(inputLocation)
    if(backendResponse == None):
        return_message = "Location Does Not Exist"
    else:
        address = backendResponse[0]
        latitude = backendResponse[1]['lat']
        longitude = backendResponse[1]['lng']
        location = Location(inputLocation, address, latitude, longitude)
        location.insert(email)
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
        pref_list = [preference]
        mongo.db.users.update_one({'email': email}, {'$set': {'preference': pref_list}})
    else:
        # check if the preference already exist in the list
        if preference not in user_preference:
            user_preference.append(preference)
        mongo.db.users.update_one({'email': email}, {'$set': {'preference': user_preference}})
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
        if del_pre in user_pre:
            user_pre.remove(del_pre)
        mongo.db.users.update_one({'email': email}, {'$set': {'preference': user_pre}})
    return return_message

@main.route('/getPref', methods=['GET', 'POST'])
def getPreference():
    content = request.get_json(silent=True)
    email = content.get('email')
    print('before getting user')
    user = CheckIfUserExists(email)
    print('after getting user')
    result = user.get('preference')
    if result is None:
        result = []
    resp = jsonify(result)
    return resp
   

@main.route('/generateTrip', methods=['POST'])
def generateTrip():
    content = request.get_json(silent = True)
    # user inputs
    email = content.get('email')
    trip_filter = content.get('filter')
    user = CheckIfUserExists(email)
    max_activity_num = int(trip_filter.get('activity_num'))
    if user != None:
        # starting location, parsing into coordinate
        location = user.get('location')
        coordinate = str(location.get('lat')) + ", " +str(location.get('lng'))
        # list of possible preferences
        preference_list = user.get('preference')
        # all the locations that fits the requirement
        result_locations = crawlLocations(coordinate, preference_list, trip_filter)
        # maps pid to their "type" and their corresponding location object
        pidToType, pidtoloc = parsingLocation(result_locations)
        # maps pid to their value, higher the value, more willingness from the
        # user for that location(activity)
        pidtoval = dict()
        # generating random rating for current user for each type he likes
        TypeToRating = dict()
        for i in preference_list:
            TypeToRating[i] = random.random() * 10
        # compute pid and their corresponding value
        for i in pidToType.keys():
            pidtoval[i] = 0
            for j in pidToType.get(i):
                if TypeToRating.get(j) != None:
                    pidtoval[i] = pidtoval.get(i) + TypeToRating[j]
        result = list()
        # get top results
        if max_activity_num < len(pidtoloc.keys()):
            while len(result) < max_activity_num:
                max_pid = max(pidtoval.items(), key = lambda x: x[1])[0]
                result.append(pidtoloc[max_pid].serialization())
                pidtoval.pop(max_pid)
        resp = jsonify(result)
        return resp
    
@main.route('/addFilter', methods=['GET', 'POST'])
def addFilter():
    return_message = "Success"
    content = request.get_json(silent=True)
    email = content.get('email')
    content_filters = content.get('filter')
    # print(content_filters)
    # print(type(content_filters))
    user = CheckIfUserExists(email)
    user_filters = user.get('filter')
    if user_filters is None:
        mongo.db.users.update_one({'email': email}, {'$set': {'filter': content_filters}})
    else:
        # update user_filters
        for key in content_filters:
            user_filters[key] = content_filters[key]
        mongo.db.users.update_one({'email': email}, {'$set': {'filter': user_filters}})
    return return_message

@main.route('/getFilter', methods=['GET', 'POST'])
def getFilter():
    content = request.get_json(silent=True)
    email = content.get('email')
    user = CheckIfUserExists(email)
    result = user.get('filter')
    if result is None:
        result = {}
    resp = jsonify(result)
    return resp