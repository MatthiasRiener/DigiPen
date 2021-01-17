from ..auth.views import oidc
from flask import Flask, Blueprint

profile = Blueprint("profile", __name__)

@profile.route('/')
def initialize():
    print("getting profile")
    return str(oidc.user_getfield("sub"))


