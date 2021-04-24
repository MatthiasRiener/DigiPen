from ...db.settings import db, oidc, socketio, mongoclient
from flask import Flask, Blueprint, render_template, abort, g, request, jsonify, redirect
from oauth2client.client import OAuth2Credentials
from flask_socketio import emit, join_room, leave_room, send

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token, get_jwt_claims, verify_fresh_jwt_in_request, verify_jwt_in_request)

from ...repository.AdminPanelRepository import AdminPanelRepository
from ...repository.LocationRepository import LocationRepository
from ...repository.IssueRepository import IssueRepository

from functools import wraps

import json
import threading

import time
from bson import json_util
from twilio.rest import Client

from ..editor.controllers import twilio_account_sid

twilio_auth_token = "a03a300a56a986d5a49badc4a35842d7"

panel = Blueprint("adminpanel", __name__,
                      static_folder="static", template_folder="templates")


adminPanel = AdminPanelRepository(testing=False)
locationRepo = LocationRepository(testing=False)
issueRepo = IssueRepository(testing=False)

usersConnected = dict()


""" 
HEADER FOR TRACKING REQUESTS
"""
from decorators import addBluePrint
addBluePrint(panel)







def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_raw_jwt()
            print("verifying if admin....")
            print("CLAIMS")
            print(claims)
            if claims["user_claims"]["is_administrator"]:
                print("USER IS ADMIN")
                return fn(*args, **kwargs)
            else:
                print("USER IS NO ADMIN")
                return json.dumps({"permission_denied": True}), 801

        return decorator

    return wrapper








@panel.route('/', methods=["GET"])
def index():
    return render_template('/admindashboard/index.html')

@panel.route('/getTotalUsers', methods=["POST"])
@jwt_required
@admin_required()
def getTotalUsersRoute():
    claims = get_jwt_claims()
    print("CLAIMS!")
    print(claims)
    data = request.form
    start = data["start"]
    end = data["end"]
    return adminPanel.getUserCount(start=start, end=end)

@panel.route('/getTotalInteractions', methods=["POST"])
@jwt_required
@admin_required()
def getTotalInteractionsRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    return adminPanel.getInteractions(start=start, end=end)

@panel.route('/getIssues', methods=["POST"])
@jwt_required
@admin_required()
def getTotalIssuesRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    return issueRepo.getIssues(start=start, end=end)


@panel.route('/getTotalPresentations', methods=["POST"])
@jwt_required
@admin_required()
def getTotalPresentationsRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    return adminPanel.getPresentationCount(start=start, end=end)

@panel.route('/getUserInteractions', methods=["POST"])
@jwt_required
@admin_required()
def getUserInteractions():
    data = request.form
    start = data["start"]
    end = data["end"]
    return json.dumps({"res": adminPanel.getUserInteractions(start=start, end=end)})


@panel.route('/getActiveUsersOverTime', methods=["POST"])
@jwt_required
@admin_required()
def getActiveUsersOverTimeRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    
    return json.dumps({"res": adminPanel.getActiveUsersOverTime(start=start, end=end)})
    
@panel.route('/getCurrentOnlineUsers', methods=["GET"])
@jwt_required
@admin_required()
def getCurrentOnlineUsersRoute():
    return json.dumps({"res": len(usersConnected)})


@panel.route('/getLocation', methods=["POST"])
@jwt_required
@admin_required()
def getLocationDataRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    return json.dumps({"res": locationRepo.getUsersAndLocation(start, end)})


@panel.route('/getLocationFromRequests', methods=["POST"])
@jwt_required
@admin_required()
def getLocationDataFromRequestsRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    return json.dumps({"res": locationRepo.getRequestsAndLocation(start, end)})



@panel.route('/getLocationCount', methods=["POST"])
@jwt_required
@admin_required()
def getLocationWithCountRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    locationData, totalRequest = locationRepo.getUserCountWithLocation(start, end)
    return json.dumps({"res": locationData, "total_request": totalRequest})


@panel.route('/getLocationRequestsCount', methods=["POST"])
@jwt_required
@admin_required()
def getLocationRequestsCountRoute():
    data = request.form
    start = data["start"]
    end = data["end"]
    locationData, totalRequest = locationRepo.getRequestsCountWithLocation(start, end)
    return json.dumps({"res": locationData, "total_request": totalRequest})



@panel.route('/getCreatedTasks', methods=["GET"])
@jwt_required
@admin_required()
def getTodaysTasksRoute():
    return json.dumps({"res": adminPanel.getTodaysCreatedTasks()})

@panel.route('/getCreatedPresentations', methods=["GET"])
@jwt_required
@admin_required()
def getTodaysPresentationsRoute():
    return json.dumps({"res": adminPanel.getTodaysCreatedPresentations()})

@panel.route('/getCreatedSlides', methods=["GET"])
@jwt_required
@admin_required()
def getTodaysSlidesRoute():
    return json.dumps({"res": adminPanel.getTodaysCreatedSlides()})

@panel.route('/getVideoChatInformation', methods=["GET"])
@jwt_required
@admin_required()
def getVideoChatInformationRoute():
    client = Client(twilio_account_sid, twilio_auth_token)
    records = client.usage.records.today.list(category="group-rooms-participant-minutes")
    duration = dict()
    for el in records:
        if el.category == "group-rooms-participant-minutes":
            if el.category not in duration:
                duration[el.category] = 0
            duration[el.category] += float(el.usage)
    return json.dumps({"res": duration})



@socketio.on('connectUser')
def userHasConnected(json):
    print("User has connected!!!!")

    if "session" not in usersConnected:
        usersConnected[json["user_id"]] = dict()
        usersConnected[json["user_id"]]["session"] = str(request.sid)[::-1]
        usersConnected[json["user_id"]]["u_id"] = json["user_id"]
        usersConnected[json["user_id"]]["jtime"] = time.time()

        mongoclient.db["loginsTracker"].insert_one({"type": "login", "session": request.sid, "user": json["user_id"], "time": time.time()})

    usersConnected[json["user_id"]]["sid"] = request.sid


    join_room(json["user_id"])
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
    poppedUser = None


    for el in list(usersConnected):
        if usersConnected[el]["sid"] == user_id:
            poppedUser = usersConnected.pop(el)
    
    if poppedUser is not None:
        print("Count:",  len(usersConnected))
        socketio.emit('notifyOnlineUsers', json_util.dumps({"res": adminPanel.getOnlineUsers(users=usersConnected)}), broadCast=True)
        socketio.emit('notifyUserCount', len(usersConnected), broadcast=True)

        print(poppedUser)
        mongoclient.db["loginsTracker"].insert_one({"type": "logout", "session": poppedUser["sid"], "user": poppedUser["u_id"], "time": time.time(), "duration": int(round((time.time() - poppedUser["jtime"]) / 60))})
        print("Notifying Users!!!!!")



