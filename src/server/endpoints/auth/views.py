from flask import Blueprint, render_template, current_app as app
from flask_oidc import OpenIDConnect
from oauth2client.client import OAuth2Credentials
import requests
from .custom_oidc_socket import logoutSession

auth = Blueprint('auth', __name__, static_folder="static",
                 template_folder="templates")
oidc = OpenIDConnect()


# der openid client soll vor dem ersten request abgesendet werden, method notwendig weil app nur in request zugreifbar ist


@auth.before_app_first_request
def initializeOidc():
    oidc.init_app(app)


@auth.route('/')
def index():
    if oidc.user_loggedin:
        return 'Hello %s <a href="/auth/logout">Log out</a>' % oidc.user_getfield('preferred_username')
    else:
        return 'You are not logged in. <a href="/auth/login">Log In </a>'


@auth.route('/login')
@oidc.require_login
def login():
    print(oidc.get_access_token())
    return 'Succesfully logged in. <a href="/auth/logout">Log out</a>'


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


@auth.route('/templatetest')
def test():
    return render_template('test.html')
