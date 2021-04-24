from functools import wraps
from flask import request
from flask_jwt_extended import get_jwt_identity
from app.db.settings import mongoclient, socketio
import time

import requests, threading

import eventlet

eventlet.monkey_patch()

def dRR():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            route = request.path
            ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
            location_data = requests.get('http://ip-api.com/json/' + ip).json()
            u_id = get_jwt_identity()
            print("ROUTE WAS REQUESTED")
            print("==========")
            print(route)
            print(ip)
            print(u_id)
            print("=============")

            

            mongoclient.db['activity'].insert_one({"type": "routeRequested", "route": route,  "user": u_id, "remote_addr": ip, "time": time.time(), "location": location_data})
            eventlet.spawn(newRequest)

            return fn(*args, **kwargs)
           

        return decorator

    return wrapper


def newRequest():
    socketio.emit('newRequestNotified', "Imma drop the nbomb", broadCast=True)

    print("Was geht ab!")