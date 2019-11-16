from ..extensions import mongo
from ..extensions import bcrypt
from flask import Blueprint, request, jsonify


class Feedback:
    
    def __init__(self, email, rating, comment):
        self.user_email = email
        self.user_rating = rating
        self.user_comment = comment
    
    def addFeedback(self):
        mongo.db.users.insert_one({'email': self.user_email, 'rating': self.user_rating, 'comment': self.user_comment})
    
