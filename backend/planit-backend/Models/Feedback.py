from ..extensions import mongo
from ..extensions import bcrypt
from flask import Blueprint, request, jsonify


class Feedback:
    
    def __init__(self, email, rating, comment):
        self.user_email = email
        self.user_rating = rating
        self.user_comment = comment
    
    def getEmail(self):
        return self.user_email
    
    def getRating(self):
        return self.user_rating

    def getComment(self):
        return self.getComment

    def addFeedback(self):
        mongo.db.Feedback.insert_one({'email': self.user_email, 'rating': self.user_rating, 'comment': self.user_comment})
    
