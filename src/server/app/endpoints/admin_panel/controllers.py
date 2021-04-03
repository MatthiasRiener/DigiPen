from ...db.settings import db, oidc, socketio
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials
from flask_socketio import emit, join_room, leave_room, send

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)

from ...repository.AdminPanelRepository import AdminPanelRepository


import json

import time
from bson import json_util

panel = Blueprint("adminpanel", __name__,
                      static_folder="static", template_folder="templates")


adminPanel = AdminPanelRepository(testing=False)

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
    

