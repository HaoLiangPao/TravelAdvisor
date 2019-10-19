from ..extensions import mongo
from ..extensions import bcrypt

class Location:
    def __init__(self, name, address, longitude, latitude):
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
    