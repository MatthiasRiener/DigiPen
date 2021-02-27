from ...db.settings import db, oidc
from flask import Flask, Blueprint, render_template, abort, g
from oauth2client.client import OAuth2Credentials

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)


from ...models.User import User
from ...repository.AuthenticationRepository import AuthenticationRepository
from ...repository.WorkspaceRepository import WorkspaceRepository
from ...repository.TaskRepository import TaskRepository
from ...repository.PresentationRepository import PresentationRepository

import json

profile = Blueprint("profile", __name__,
                    static_folder="static", template_folder="templates")

repo = AuthenticationRepository(testing=False)
wRepo = WorkspaceRepository(testing=False)
taskRepo = TaskRepository(testing=False)
presRepo = PresentationRepository(testing=False)

@profile.route('/')
def index():
    return render_template('/profile/index.html')


@profile.route('/user')
@jwt_required
def getUserData():
    cur_user = get_jwt_identity()
    user = repo.retrieveUser(user_id=cur_user)
    user.update({"workspaces": wRepo.getRepoCounter(u_id=cur_user)})
    return json.dumps(user)

@profile.route('/getUpComingTasks')
@jwt_required
def getUsersTasksRoute():
    u_id = get_jwt_identity()
    res = taskRepo.getUsersTasks(u_id=u_id)

    return json.dumps({"res": res})


@profile.route('/getPresentationCount')
@jwt_required
def getUsersPresentationCountRoute():
    u_id = get_jwt_identity()
    response = presRepo.getPresentationCount(user_id=u_id)
    return json.dumps({"res": response})



@profile.route('/getWorkspaces')
@jwt_required
def getUsersWorkspacesRoute():
    u_id = get_jwt_identity()
    response = wRepo.getWorkspaces(u_id=u_id)
    return json.dumps({"res": response})