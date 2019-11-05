from ..extensions import mongo
from ..extensions import bcrypt

class Location:
    def __init__(self, name, address, latitude, longitude, duration, description):
        self.__name = name
        self.__address = address
        self.__longitude = longitude
        self.__latitude = latitude
        self.__duration = duration
        self.__description = description

    def getName(self):
        return self.__name

    def getAddress(self):
        return self.__address

    def getLongitude(self):
        return self.__longitude

    def getLatitude(self):
        return self.__latitude

    def getDuration(self):
        return self.__duration

    def getDescription(self):
        return self.__description

    def insert(self, email):
         mongo.db.users.update_one({'email': email}, {'$set': {'location': 
            {'address': self.__address, 
            'lat': self.__latitude, 'lng': self.__longitude, 'dur': self.__duration,
            'description':self.__description}}})
            
    def serialization(self):
        result = dict()
        result['name'] = self.__name
        result['address'] = self.__address
        result['latitude'] = self.__latitude
        result['longitude'] = self.__longitude
        result['duration'] = self.__duration
        return result