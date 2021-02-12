from ...db.settings import db, oidc, socketio
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials
from flask_socketio import emit

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
    return presRepo.requestPresentation(u_id=u_id)


@dashboard.route('/createPresentation', methods=["POST"])
@jwt_required
def createPresentation():
    data = request.form
    return presRepo.createPresentation(user_id=get_jwt_identity(), data=data)


@dashboard.route('/getTemplates', methods=["GET"])
def getTemplates():
    return presRepo.getTemplates()


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
    

    return emit('inviteUser', pres_res.to_mongo())