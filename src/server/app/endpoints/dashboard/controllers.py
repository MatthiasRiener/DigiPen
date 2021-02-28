from ...db.settings import db, oidc, socketio
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials
from flask_socketio import emit, join_room, leave_room, send

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)

from ...repository.AuthenticationRepository import AuthenticationRepository
from ...repository.PresentationRepository import PresentationRepository

import json

import time
from bson import json_util

dashboard = Blueprint("dashboard", __name__,
                      static_folder="static", template_folder="templates")

authRepo = AuthenticationRepository(testing=False)
presRepo = PresentationRepository(testing=False)

@dashboard.route('/', methods=["GET"])
def index():
    return render_template('/dashboard/index.html')


@dashboard.route('/requestPresentation', methods=["GET", "POST"])
@jwt_required
def requestPresentation():
    u_id = get_jwt_identity()

    response, p_id = presRepo.requestPresentation(u_id=u_id)
    
    return response


@dashboard.route('/createPresentation', methods=["POST"])
@jwt_required
def createPresentation():
    data = request.form
    return presRepo.createPresentation(user_id=get_jwt_identity(), data=data)


@dashboard.route('/getTemplates', methods=["GET"])
def getTemplates():
    return presRepo.getTemplates()

@dashboard.route('/deleteRequested', methods=["POST"])
@jwt_required
def deleteRequestedRoute():
    data = request.form
    p_id = data['p_id']
    return presRepo.deleteRequestedPresentation(p_id=p_id)


@dashboard.route('/getInvites', methods=["GET"])
@jwt_required
def getInvites():
    user_id = get_jwt_identity()
    return presRepo.getInvites(user_id=user_id)




@socketio.on('connectUser')
def connect(json):
    u_id = json['user_id']
    join_room(u_id)
    send(u_id + " has joined the room", room=u_id)
# websockets
@socketio.on("searchUser")
def handle_search_user(json):
    s_email = json['email']
    p_id = json['p_id']
    users = authRepo.retrieveUsersByMail(s_email)
    new_users = presRepo.getNotInvitedUsers(p_id=p_id, users=users)

    return emit('searchUser', new_users)

@socketio.on("inviteUser")
def handle_invite_user(json):
    s_email = json['email']
    p_id = json['p_id']

    user = authRepo.retrieveUserByMail(s_email)
    pres = presRepo.inviteUser(user_id=user.u_id, p_id=p_id)

    pres_res = authRepo.getUsersForPresentation(pres=pres)
    
    sendInviteMessage(p_id=p_id, u_id=user.u_id)
    broadCastPresentation(pres_res)
    
    return emit('inviteUser', pres_res.to_mongo())

@socketio.on("handleInvite")
def handle_invite_pressed(json):
    print(json['status'])
    status = json['status']
    p_id = json['p_id']
    user_id = json['u_id']
    
    msg = presRepo.handleInvitePressed(status, p_id, user_id)

    sendMessageToClient("invitePressed", msg, user_id)
    sendMessageToCreator("handleInvite", msg, p_id)
def sendInviteMessage(p_id, u_id):
    emit( "You have been invited to join the presentation %s. " % (p_id), room=u_id)

def sendMessageToCreator(event, msg, pres_id):
    u_id = presRepo.getPresentation(p_id=pres_id).creator
    emit(event, msg, room=u_id)
def broadCastMessage(event, pres_id, msg):
    for user in presRepo.getPresentation(pres_id).users:
        if user['status'] == 'accepted':
            emit(event, msg, room=user["u_id"])
def sendMessageToClient(event, msg, client):
    emit(event, msg, room=client)
def broadCastPresentation(pres):
    print(pres.to_mongo())
    print("====")
    print(pres.users)
    
    for user in pres.users:
        if user['status'] == 'accepted':
            emit("New user was invited to your lobby", room=user["_id"])
    
