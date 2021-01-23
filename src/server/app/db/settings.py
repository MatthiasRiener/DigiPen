from flask_pymongo import PyMongo
from flask_oidc import OpenIDConnect
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager

jwt = JWTManager()
db = MongoEngine()
oidc = OpenIDConnect()
