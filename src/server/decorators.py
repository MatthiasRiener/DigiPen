from functools import wraps
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.db.settings import mongoclient, socketio
import time

import requests
import threading

import eventlet

eventlet.monkey_patch()

@jwt_required
def dRR():

    route = request.path
    user = get_jwt_identity()

    ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)

    print("ROUTE WAS REQUESTED")
    print("==========")
    print(route)
    print(ip)
    print("=============")

    mongoclient.db['activity'].insert_one({"type": "routeRequested", "route": route,
                                           "user": user, "remote_addr": ip, "time": time.time()})

    eventlet.spawn(newRequest)


def newRequest():

    socketio.emit('newRequestNotified', "Imma drop the nbomb", broadCast=True)

    print("Was geht ab!")


def addBluePrint(name, bp):
    print("ADDING BLUEPRINT")

    @bp.before_request
    def before_panel_request():

        if "/" + name + "/" == request.path:
            print("LOADING PAGE")
        else:
            print("TRYINGIN TO GET USERID")
            dRR()
