from flask_pymongo import PyMongo
from flask_oidc import OpenIDConnect
from flask_mongoengine import MongoEngine



db = MongoEngine()
oidc = OpenIDConnect()
