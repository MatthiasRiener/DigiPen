from ...db.settings import db, oidc, socketio
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials
from flask_socketio import emit, join_room, leave_room, send

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)



import json

import time
from bson import json_util

panel = Blueprint("adminpanel", __name__,
                      static_folder="static", template_folder="templates")




@panel.route('/', methods=["GET"])
def index():
    return render_template('/admindashboard/index.html')