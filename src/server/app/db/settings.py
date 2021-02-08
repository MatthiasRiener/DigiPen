from flask_oidc import OpenIDConnect
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO

jwt = JWTManager()
db = MongoEngine()
oidc = OpenIDConnect()
socketio = SocketIO()