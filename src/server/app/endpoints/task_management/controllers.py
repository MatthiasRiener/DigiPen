from flask import Flask, Blueprint, render_template, abort, g, request

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)


from ...repository.TaskRepository import TaskRepository
from ...repository.AuthenticationRepository import AuthenticationRepository
import json

task_m = Blueprint("task_management", __name__,
                    static_folder="static", template_folder="templates")

taskRepo = TaskRepository(testing=False)
authRepo = AuthenticationRepository(testing=False)




@task_m.route('/', methods=["GET"])
def index():
    return render_template('/task_management/index.html')

@task_m.route('/getPresentations', methods=["GET"])
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


@task_m.route('/checkUser', methods=["POST"])
def checkForUser():
    data = request.form
    user_id = data["u_id"]
    user = authRepo.retrieveUserWithOutTimeChange(user_id)
    return json.dumps({"res": user})
    

@task_m.route('/getUsers', methods=["POST"])
@jwt_required
def getUsersRoute():
    data = request.form
    p_id = data["p_id"]
    print(p_id)
    res = taskRepo.getUsersFromPresentation(p_id=p_id)
    return json.dumps({"res": res})


@task_m.route('/addTask', methods=["POST"])
@jwt_required
def createTaskRoute():
    data = request.form
    p_id = data['presentation']
    task_name = data["name"]
    task_assignee = data['user']
    subtasks = data.getlist("subtasks[]")
    end_date = data['end_date']
    start_date = data["start_date"]
    print(subtasks)
    print(data)
    res = taskRepo.createTask(p_id=p_id, name=task_name, end_date=end_date, start_date=start_date, u_id=get_jwt_identity(), assignee=task_assignee, subtasks=subtasks )

    return json.dumps({"res": 'res'})

@task_m.route('/getTasks', methods=["POST", "GET"])
@jwt_required
def getUsersTasksRoute():
    
    user_id = get_jwt_identity()
    res = taskRepo.getTasks(u_id=user_id)
    return json.dumps({"res": res})

@task_m.route('/getTaskInfo', methods=["POST"])
@jwt_required
def getTaskInfoRoute():
    data = request.form
    t_id = data["id"]

    response = taskRepo.getTask(task_id=t_id)

    return json.dumps({"res": response})

@task_m.route('/updateTask', methods=["POST"])
@jwt_required
def updateTaskRoute():
    data = request.form
    p_id = data['presentation']
    t_id = data["id"]
    task_name = data["name"]
    task_assignee = data['user']
    subtasks = data.getlist("subtasks[]")
    end_date = data['end_date']
    start_date = data["start_date"]

    res = taskRepo.updateTask(t_id=t_id, p_id=p_id, name=task_name, end_date=end_date, start_date=start_date,  assignee=task_assignee, subtasks=subtasks )
    return json.dumps({"res": 'updated'})
