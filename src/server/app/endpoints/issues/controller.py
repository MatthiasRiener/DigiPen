from ...db.settings import db, oidc, socketio
from flask import Flask, Blueprint, render_template, abort, g, request, jsonify, redirect
from oauth2client.client import OAuth2Credentials
from flask_socketio import emit, join_room, leave_room, send

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token, get_jwt_claims, verify_fresh_jwt_in_request, verify_jwt_in_request)

from ...repository.IssueRepository import IssueRepository
from functools import wraps

import json

import time
from bson import json_util

issueRepo = IssueRepository(testing=False)

iss = Blueprint("issues", __name__,
                      static_folder="static", template_folder="templates")



@iss.route('/submitIssue', methods=["POST"])
@jwt_required
def submitNewIssueRoute():
    data = request.form
    user = get_jwt_identity()

    status = issueRepo.createIssue(data, user)
    return json.dumps({"res": status})

@iss.route('/getSpecificIssue', methods=["POST"])
@jwt_required
def getSpecificIssue():
    data = request.form
    issue_id = data["id"]

    issue = issueRepo.getIssue(i_id=issue_id)
    return json.dumps({"res": issue})

@iss.route('/closeIssue', methods=["POST"])
@jwt_required
def closeSpecificIssue():
    data = request.form
    issue_id = data["id"]

    issue = issueRepo.closeIssue(i_id=issue_id)
    return json.dumps({"res": issue})
