from flask_oidc import OpenIDConnect
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_pymongo import PyMongo

jwt = JWTManager()
db = MongoEngine()
oidc = OpenIDConnect()
socketio = SocketIO()
mongoclient = PyMongo()