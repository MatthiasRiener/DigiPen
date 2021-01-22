from flask import Blueprint, render_template, redirect, url_for, current_app as app
from flask_oidc import OpenIDConnect
from oauth2client.client import OAuth2Credentials
import requests
from .custom_oidc_socket import logoutSession
from ..db.settings import mongo, oidc

from ..profile.controllers import profile

auth = Blueprint('auth', __name__, static_folder="static",
                 template_folder="templates")


@auth.route('/')
def index():
   return 'Waiting...'

@auth.route('/login')
@oidc.require_login
def login():
    info = oidc.user_getinfo(['preferred_username', 'email', 'sub'])
    user_id = info.get('sub')
    user_db = mongo.db.usersettings.find_one({"user_id": user_id})
    print(user_id)

    if user_db is None:
        res = mongo.db.usersettings.insert({"user_id": user_id})
        print("user registrerd in mongo", res)
    else:
        print("user is in mongo")

    access_token = OAuth2Credentials.from_json(
        oidc.credentials_store[user_id]).access_token

    redir = render_template('/setstorage/storage.html', access_token=access_token)
    return redir


@auth.route('/logout')
def logout():
    if oidc.user_loggedin:
        refresh_token = oidc.get_refresh_token()
        access_token = oidc.get_access_token()
        logoutSession(refresh_token, access_token)
        oidc.logout()
        return "You've been logged out. <a href='/auth'>Back</a>"
    else:
        return "You've already been logged out. <a href='/auth'>Back</a>"


@auth.route('authorization_complete')
def redirectProfile():
    return redirect(url_for('profile.index'))


def add(x, y):
    return x + y
