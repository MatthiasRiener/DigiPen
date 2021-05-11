from flask_oidc import OpenIDConnect
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_pymongo import PyMongo

IS_SERVER = True


jwt = JWTManager()
db = MongoEngine()
oidc = OpenIDConnect()
socketio = SocketIO(async_mode='threading')
mongoclient = PyMongo()