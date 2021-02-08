from ...db.settings import db, oidc, socketio
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials
from flask_socketio import emit

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)


import json

import time

dashboard = Blueprint("dashboard", __name__,
                    static_folder="static", template_folder="templates")



@dashboard.route('/', methods=["GET"])
def index():
    return render_template('/dashboard/index.html')


@dashboard.route('/createPresentation', methods=["POST"])
@jwt_required
def createPresentation():
    data = request.form

    print(data)

    p_name = data['name']
    p_created = time.time()
    p_keywords = data.getlist('keywords[]')
    p_id = get_jwt_identity()


    return json.dumps({"p_name": p_name, "created": p_created, "user_id": p_id, "keywords": p_keywords})


# websockets
@socketio.on("my event")
def handle_search_user(json):
    print("moin!! :D", json)
    emit('message', json)