from ...db.settings import db, oidc
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials


from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)


from ...models.User import User
from ...repository.WorkspaceRepository import WorkspaceRepository
from ...repository.AuthenticationRepository import AuthenticationRepository

import json


workspace = Blueprint("workspace", __name__,
                    static_folder="static", template_folder="templates")

wRepo = WorkspaceRepository(testing=False)
aRepo = AuthenticationRepository(testing=False)




@workspace.route('/createWorkspace', methods=["POST"])
@jwt_required
def createWorkspace():
    data = request.form
    w_name = data['name']
    w_users = aRepo.getUserIds(users=data.getlist('users[]'))
    msg = wRepo.createWorkspace(name=w_name, users=w_users, creator=get_jwt_identity())


    return msg

@workspace.route('/getWorkspaces')
@jwt_required
def getUsersWorkspacesRoute():
    u_id = get_jwt_identity()
    response = wRepo.getWorkspaces(u_id=u_id)
    return json.dumps({"res": response})