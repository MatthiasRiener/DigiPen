from flask import Flask, Blueprint, render_template, abort, g, request

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)


from ...repository.TaskRepository import TaskRepository

import json

task_m = Blueprint("task_management", __name__,
                    static_folder="static", template_folder="templates")

taskRepo = TaskRepository(testing=False)
@task_m.route('/', methods=["GET"])
def index():
    return render_template('/task_management/index.html')

@task_m.route('/getTasks', methods=["GET"])
@jwt_required
def getTasksRoute():
    user_id = get_jwt_identity()
    return taskRepo.getPresentationsForTask(u_id=user_id)

@task_m.route('/checkPresentation', methods=["POST"])
@jwt_required
def getPresentationRoute():
    data = request.form
    print(data)
    p_id = data["p_id"]
    user_id=get_jwt_identity()
    res = taskRepo.checkUser(user_id=user_id, p_id=p_id)
    return res

@task_m.route('/getUsers', methods=["POST"])
@jwt_required
def getUsersRoute():
    data = request.form
    p_id = data["p_id"]
    res = taskRepo.getUsersFromPresentation(p_id=p_id)
    return json.dumps({"res": res})
