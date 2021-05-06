from ...db.settings import db, oidc, socketio
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials
from flask_socketio import emit, join_room, leave_room, send

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)

from ...repository.LocationRepository import LocationRepository

import json

from bson import json_util

location = Blueprint("location", __name__,
                      static_folder="static", template_folder="templates")



lRepo = LocationRepository(testing=False)



@location.route('/tracker', methods=["POST"])
@jwt_required
def getLocationData():
    data = dict(request.form)
    u_id = get_jwt_identity()
    locationData = json.loads(data["location"])
    lRepo.createLocationEntry(user_id=u_id, location_data=locationData)
    return json.dumps({"res": locationData})