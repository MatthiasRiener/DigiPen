from ...db.settings import db, oidc, socketio
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials
from flask_socketio import emit, join_room, leave_room, send

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)

from ...repository.AdminPanelRepository import AdminPanelRepository
from ...repository.LocationRepository import LocationRepository

import json
import threading

import time
from bson import json_util

panel = Blueprint("adminpanel", __name__,
                      static_folder="static", template_folder="templates")


adminPanel = AdminPanelRepository(testing=False)
locationRepo = LocationRepository(testing=False)

usersConnected = dict()


@panel.route('/', methods=["GET"])
def index():
    return render_template('/admindashboard/index.html')

@panel.route('/getTotalUsers', methods=["POST"])
@jwt_required
def getTotalUsersRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    return adminPanel.getUserCount(start=start, end=end)

@panel.route('/getTotalInteractions', methods=["POST"])
@jwt_required
def getTotalInteractionsRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    return adminPanel.getInteractions(start=start, end=end)

@panel.route('/getTotalPresentations', methods=["POST"])
@jwt_required
def getTotalPresentationsRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    return adminPanel.getPresentationCount(start=start, end=end)

@panel.route('/getUserInteractions', methods=["POST"])
@jwt_required
def getUserInteractions():
    data = request.form
    start = data["start"]
    end = data["end"]
    return json.dumps({"res": adminPanel.getUserInteractions(start=start, end=end)})


@panel.route('/getActiveUsersOverTime', methods=["POST"])
@jwt_required
def getActiveUsersOverTimeRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    
    return json.dumps({"res": adminPanel.getActiveUsersOverTime(start=start, end=end)})
    
@panel.route('/getCurrentOnlineUsers', methods=["GET"])
@jwt_required
def getCurrentOnlineUsersRoute():
    return json.dumps({"res": len(usersConnected)})


@panel.route('/getLocation', methods=["POST"])
@jwt_required
def getLocationDataRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    return json.dumps({"res": locationRepo.getUsersAndLocation(start, end)})



@socketio.on('connectUser')
def userHasConnected(json):
    print("User has connected!!!!")
    usersConnected[json["user_id"]] = request.sid
    thread = threading.Thread(target=handleConnect, kwargs=dict(user_id=json["user_id"]))
    thread.start()

@socketio.on('disconnect')
def userHasDisconnected():
    print("User has disconnected!!!")
    thread = threading.Thread(target=handleDisconnect, kwargs=dict(user_id=request.sid))
    thread.start()

def handleConnect(user_id):
    socketio.emit('notifyOnlineUsers', json_util.dumps({"res": adminPanel.getOnlineUsers(users=usersConnected)}), broadCast=True)
    socketio.emit('notifyUserCount', len(usersConnected), broadcast=True)
    print("Notifying users!")

def handleDisconnect(user_id):
    for el in list(usersConnected):
        if usersConnected[el] == user_id:
            usersConnected.pop(el)
    print("Count:",  len(usersConnected))
    socketio.emit('notifyOnlineUsers', json_util.dumps({"res": adminPanel.getOnlineUsers(users=usersConnected)}), broadCast=True)
    socketio.emit('notifyUserCount', len(usersConnected), broadcast=True)
    print("Notifying Users!!!!!")