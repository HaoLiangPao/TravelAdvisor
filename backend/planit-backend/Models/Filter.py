from ..extensions import mongo
from ..extensions import bcrypt
from flask import Blueprint, request, jsonify


class Filter:
    
    def __init__(self, email):
        self.user_email = email
        self.user_filters = mongo.db.users.find_one({"email": email}).get('filter')
    
    def addFilters(self, content_filters):
        user_filters = self.user_filters
        if user_filters is None:
            mongo.db.users.update_one({'email': self.user_email}, {'$set': {'filter': content_filters}})
        else:
            # update user_filters
            for key in content_filters:
                user_filters[key] = content_filters[key]
            mongo.db.users.update_one({'email': self.user_email}, {'$set': {'filter': user_filters}})
    
    def getFilters(self):
        res = self.user_filters
        if res is None:
            res = {}
        return jsonify(res)
    
