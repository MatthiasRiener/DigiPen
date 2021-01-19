from flask_pymongo import PyMongo
from flask_oidc import OpenIDConnect

mongo = PyMongo()
oidc = OpenIDConnect()


def getActiveSession():
    return oidc.user_getfield('sub');