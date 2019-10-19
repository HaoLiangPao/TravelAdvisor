from ..extensions import mongo
from ..extensions import bcrypt

class User:

    def __init__(self,email, password=None):
        self.email = email
        self.__password = password
    
    def checkIfUserExists(self):
        user_collection = mongo.db.users
        user = user_collection.find_one({"email": self.email})
        if (self.__password is not None):
            if (not bcrypt.check_password_hash(user.get("password"), self.__password)):
                raise ValueError('Passwrod is inncorrect for current user')
        return user

    def createAccount(self):
        if self.__password == None:
            raise ValueError('Cannot Create User. Passwrod Does not exists.')
        mongo.db.users.insert(
            {'email': self.email, 'password': bcrypt.generate_password_hash(self.__password).decode('utf-8')})
