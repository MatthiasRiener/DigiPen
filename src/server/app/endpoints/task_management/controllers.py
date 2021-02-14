from flask import Flask, Blueprint, render_template, abort, g, request

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)


from ...repository.repository import TaskRepositoryInstance

task_m = Blueprint("task_management", __name__,
                    static_folder="static", template_folder="templates")

taskRepo = TaskRepositoryInstance()

@task_m.route('/', methods=["GET"])
def index():
    return render_template('/task_management/index.html')

@task_m.route('/getTasks', methods=["GET"])
@jwt_required
def getTasksRoute():
    user_id = get_jwt_identity()
    return taskRepo.repo.getPresentationsForTask(u_id=user_id)