import sys
from ...db.settings import db, oidc, socketio
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials


from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)

from flask_socketio import emit, join_room, leave_room, send


import threading

from ...repository.EditorRepository import EditorRepository
from ...repository.AuthenticationRepository import AuthenticationRepository
from ...repository.PresentationRepository import PresentationRepository

from functools import wraps

import json
from bson import json_util

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

from twilio.rest import Client
client = Client(twilio_api_key_sid, twilio_api_key_secret)

@editor.route('/')
def index():
    print("HELLO!")
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

    return editorRepo.updateCanvas(p_id=p_id, canvas=canvas, c_id=c_id, width=width, height=height, user=get_jwt_identity())


@editor.route('/createSlide', methods=["POST"])
@jwt_required
def createSlideRoute():
    data = request.form
    p_id = data['p_id']
    return json.dumps({"res": editorRepo.addSlide(p_id=p_id, user=get_jwt_identity())})


@editor.route('/getSpecificSlide', methods=["POST"])
@jwt_required
def getSpecificSlide():
    data = request.form
    s_id = data["s_id"]
    return json.dumps({"res": editorRepo.getSpecificSlide(s_id=s_id)})


import time, os
from os import path, mkdir
import urllib
import requests, mimetypes

@editor.route('/proxyImage', methods=["POST"])
@jwt_required
def proxyImageToLoad():
    data = request.form
    url = data["url"]
    p_id = data["p_id"]
    print(url)


    response = requests.get(url, stream=True)
    content_type = response.headers['content-type']
    extension = mimetypes.guess_extension(content_type)

    last_modified = str(time.time())

    
    file_name = last_modified + "_" + p_id + "_" + extension

    ## check if directory for user exists, otherwise create

    cur_dir = os.getcwd()

    cur_dir = cur_dir + "/app/files/static/editor/img"
        

    if not path.exists(cur_dir + "/images/" + p_id):
        mkdir(cur_dir + "/images/" + p_id + "/")


    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
    headers={'User-Agent':user_agent,} 


    with open(cur_dir + "/images/" + p_id + "/" + file_name, 'wb') as img:
        
        img.write(response.content)
        img.close()


    return json.dumps({"res": file_name})

@editor.route('/getSlides', methods=["POST"])
@jwt_required
def getSlidesRoute():
    data = request.form
    p_id = data["p_id"]
    return json.dumps({"res": editorRepo.getSlides(p_id=p_id)})

from urllib.request import urlopen

@editor.route('/getVideoChatInformation', methods=["GET"])
def getVideoChatInformationRoute():


    print("WAS GEHT AB!!!")

    rooms = client.video.rooms.list()


    for room in rooms:
        participants_room = room.participants.list()
        
        for participant in participants_room:

            published_tracks = participant.published_tracks.list()

            for track in published_tracks:
                print(track.url)
                response = client.request("GET", track.url)
                print(response)




    
    """
  
    """
    
    
    return json.dumps({"res": 1})
    


# video chat route
@editor.route('/connectToVideoChat', methods=['POST', 'GET'])
@jwt_required
def connectVideoChatRoute():
    u_id = get_jwt_identity()
    data = request.form
    p_id = data["p_id"]
    print("NEW VIDEO ROOM")

    print("==============")
    print(p_id)
    print("===============")

    if not u_id:
        abort(401)

    user = authRepo.retrieveUserWithOutTimeChange(user_id=u_id)
    username = user["name"]

    try:
        group_room = client.video.rooms.create(
            unique_name=p_id,
            type='group',
            record_participants_on_connect=True
        )

    except:
        print("Room already exists.")

    token = AccessToken(twilio_account_sid, twilio_api_key_sid,
                        twilio_api_key_secret, identity=username)
    token.add_grant(VideoGrant(room=str(p_id)))

    return json.dumps({'vt': token.to_jwt().decode(), 'faggot': username})


# realtime support


@socketio.on('updateSlide')
def updateSlideSocket(json):
    u_id = json["user_id"]
    p_id = json["p_id"]
    s_id = json["s_id"]

    thread = threading.Thread(target=broadCastMessageExceptOwn, kwargs=dict(
        event="slideUpdateNotify", pres_id=p_id, msg=json_util.dumps({"u_id": u_id, "p_id": p_id, "s_id": s_id}), sender_id=u_id))
    thread.start()


@socketio.on('slideCreated')
def createSlideSocket(json):
    u_id = json["user_id"]
    print("SLIDE CREATED... SENNDING TO CLIENTS")
    thread = threading.Thread(target=broadCastMessageExceptOwn, kwargs=dict(event="slideCreatedNotify", pres_id=json["p_id"], msg=json_util.dumps(
        {"u_id": u_id, "p_id": json["p_id"], "s_id": json["s_id"]}), sender_id=u_id))
    thread.start()


def broadCastMessageExceptOwn(event, pres_id, msg, sender_id):
    for user in presRepo.getPresentation(pres_id).users:
        print("Sending to user....", sender_id)
        if user["u_id"] != sender_id:
            socketio.emit(event, msg, room=user["u_id"])


def broadCastMessage(event, pres_id, msg):
    for user in presRepo.getPresentation(pres_id).users:
        print("Sending to user....")
        if user['status'] == 'accepted':
            socketio.emit(event, msg, room=user["u_id"])
