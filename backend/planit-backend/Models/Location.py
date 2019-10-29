from ..extensions import mongo
from ..extensions import bcrypt

class Location:
    def __init__(self, name, address, latitude, longitude):
        self.__name = name
        self.__address = address
        self.__longitude = longitude
        self.__latitude = latitude

    def getName(self):
        return self.__name

    def getAddress(self):
        return self.__address

    def getLongitude(self):
        return self.__longitude

    def getLatitude(self):
        return self.__latitude

    def insert(self, email):
         mongo.db.users.update_one({'email': email}, {'$set': {'location': 
            {'address': self.__address, 
            'lat': self.__latitude, 'lng': self.__longitude}}})
            
    def serialization(self):
        result = dict()
        result['name'] = self.__name
        result['address'] = self.__address
        result['latitude'] = self.__latitude
        result['longitude'] = self.__longitude
        return result