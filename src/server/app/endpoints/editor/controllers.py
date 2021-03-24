from ...db.settings import db, oidc
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials


from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)


from ...repository.EditorRepository import EditorRepository

import json

editorRepo = EditorRepository(testing=False)

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