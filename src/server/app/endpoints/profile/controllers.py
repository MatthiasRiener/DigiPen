from ...db.settings import db, oidc
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)

import time

from PIL import Image

from ...models.User import User
from ...repository.AuthenticationRepository import AuthenticationRepository
from ...repository.WorkspaceRepository import WorkspaceRepository
from ...repository.TaskRepository import TaskRepository
from ...repository.PresentationRepository import PresentationRepository
from ...repository.LocationRepository import LocationRepository

import json
import string
import re

from os import path, mkdir

from binascii import a2b_base64

profile = Blueprint("profile", __name__,
                    static_folder="static", template_folder="templates")

repo = AuthenticationRepository(testing=False)
wRepo = WorkspaceRepository(testing=False)
taskRepo = TaskRepository(testing=False)
presRepo = PresentationRepository(testing=False)
locRepo = LocationRepository(testing=False)



@profile.route('/')
def index():
    return render_template('/profile/index.html')


@profile.route('/user')
@jwt_required
def getUserData():
    cur_user = get_jwt_identity()
    user = repo.retrieveUserWithOutTimeChange(user_id=cur_user)
    user.update({"workspaces": wRepo.getRepoCounter(u_id=cur_user)})
    user.update({"location": locRepo.getUsersLocation(user_id=cur_user)})
    return json.dumps(user)


@profile.route('/getActivityInfo')
@jwt_required
def getActivityRoute():
    u_id = get_jwt_identity()
    response = dict()
    response["presentations"] = presRepo.getPresentationCount(user_id=u_id)
    response["tasks"] = taskRepo.getTasksCount(u_id=u_id)
    response["organizations"] = wRepo.getRepoCounter(u_id=u_id)

    return json.dumps({"res": response})

@profile.route('/getUpComingTasks')
@jwt_required
def getUsersTasksRoute():
    u_id = get_jwt_identity()
    res = taskRepo.getUpcomingTasks(u_id=u_id)

    return json.dumps({"res": res})


@profile.route('/getPresentationCount')
@jwt_required
def getUsersPresentationCountRoute():
    u_id = get_jwt_identity()
    response = presRepo.getPresentationCount(user_id=u_id)
    return json.dumps({"res": response})


@profile.route('/saveDesc', methods=["POST"])
@jwt_required
def updateUsersDescriptionRoute():
    u_id = get_jwt_identity()
    data = request.form
    desc = data["desc"]
    res = repo.updateUserDesc(user_id=u_id, desc=desc)
    return json.dumps({"res": res})

import urllib
import os
import platform
import base64
import requests



@profile.route('/uploadImage', methods=["POST"])
@jwt_required
def uploadUserImageRoute():
    u_id = get_jwt_identity()
    data = request.form

    name = data["name"]
    img_data = data["img"]
    last_modified = data["lm"]

    
    file_name = last_modified + "_" + name

    ## check if directory for user exists, otherwise create

    cur_dir = os.getcwd()

    cur_dir = cur_dir + "/app/files/static/profile/img"
        

    if not path.exists(cur_dir + "/images/" + u_id):
        mkdir(cur_dir + "/images/" + u_id + "/")




    with open(cur_dir + "/images/" + u_id + "/" + file_name, 'wb') as img:
        print(type(img_data))
        print("=====")
        response = urllib.request.urlopen(img_data)
        img.write(response.file.read())
        img.close()
        repo.updateUserImg(user_id=u_id, file_name=file_name)
        print(img)


    return json.dumps({"res": repo.retrieveUserWithOutTimeChange(user_id=u_id)})