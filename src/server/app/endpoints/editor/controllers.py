from ...db.settings import db, oidc, socketio
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials


from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)

from flask_socketio import emit, join_room, leave_room, send


from ...repository.EditorRepository import EditorRepository
from ...repository.AuthenticationRepository import AuthenticationRepository
from ...repository.PresentationRepository import PresentationRepository


import json

# video chat imports
from flask import Flask, render_template, request, abort
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant



twilio_account_sid = "AC5f961ea052b5bbdde0ec5b73942b0eb3"
twilio_api_key_sid = "SKbf33ebca337a7e32451e4c7344c94a69"
twilio_api_key_secret = "J4rFopujtBdZgRLpzLVwNkAEs0Ll1KwB"

editorRepo = EditorRepository(testing=False)
authRepo = AuthenticationRepository(testing=False)
presRepo = PresentationRepository(testing=False)

editor = Blueprint("editor", __name__,
                    static_folder="static", template_folder="templates")


@editor.route('/')
def index():
    return render_template('/editor/index.html')

@editor.route('/getPresentationInfo', methods=["POST"])
@jwt_required
def getPresentationRoute():
    data = request.form
    p_id = data['p_id']
    u_id = get_jwt_identity()

    return editorRepo.retrieveData(p_id=p_id, u_id=u_id)


@editor.route('/updateCanvas', methods=["POST"])
@jwt_required
def updateCanvasRoute():
    data = request.form
    p_id = data['p_id']
    c_id = data['s_id']
    canvas = data['canvas']
    width = data['width']
    height = data['height']

    u_id = get_jwt_identity()

    return editorRepo.updateCanvas(p_id=p_id, canvas=canvas, c_id=c_id, width=width, height=height)

@editor.route('/createSlide', methods=["POST"])
@jwt_required
def createSlideRoute():
    data= request.form
    p_id = data['p_id']
    return json.dumps({"res": editorRepo.addSlide(p_id=p_id)})


@editor.route('/getSpecificSlide', methods=["POST"])
@jwt_required
def getSpecificSlide():
    data = request.form
    s_id = data["s_id"]
    return json.dumps({"res": editorRepo.getSpecificSlide(s_id=s_id)})

@editor.route('/getSlides', methods=["POST"])
@jwt_required
def getSlidesRoute():
    data = request.form
    p_id = data["p_id"]
    return json.dumps({"res": editorRepo.getSlides(p_id=p_id)})


# video chat route
@editor.route('/connectToVideoChat', methods=['POST', 'GET'])
@jwt_required
def connectVideoChatRoute():
    u_id = get_jwt_identity()
    data = request.form
    p_id = data["p_id"]

    if not u_id:
        abort(401)

    user = authRepo.retrieveUser(user_id=u_id)
    username = user["name"]

    token = AccessToken(twilio_account_sid, twilio_api_key_sid,
                        twilio_api_key_secret, identity=username)
    token.add_grant(VideoGrant(room=str(p_id)))

    return json.dumps({'vt': token.to_jwt().decode(), 'faggot': username})



# realtime support

@socketio.on('connectUser')
def connect(json):
    u_id = json['user_id']
    join_room(u_id)
    send("Welcome to the faggot channel. You're a faggot.", room=u_id)


@socketio.on('updateSlide')
def updateSlideSocket(json):
    u_id = json["user_id"]
    p_id = json["p_id"]
    s_id = json["s_id"]

    broadCastMessage("slideUpdateNotify", p_id, "The slide was updated you fucking idiot.")

def broadCastMessage(event, pres_id, msg):
    for user in presRepo.getPresentation(pres_id).users:
        print("Sending to user....")
        print(user["u_id"])
        if user['status'] == 'accepted':
            emit(event, msg, room=user["u_id"])