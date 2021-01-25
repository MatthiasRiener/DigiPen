from flask import Blueprint, render_template, redirect, url_for, current_app as app
from flask_oidc import OpenIDConnect
from oauth2client.client import OAuth2Credentials
from .custom_oidc_socket import logoutSession
from ...db.settings import db, oidc

from ..profile.controllers import profile

import json
import datetime

from ...models.User import User
from ...repository.AuthenticationRepository import AuthenticationRepository


from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)


repo = AuthenticationRepository()

auth = Blueprint('auth', __name__, static_folder="static",
                 template_folder="templates")


@auth.route('/login')
@oidc.require_login
def login():
    user_creds = oidc.user_getinfo(
        ['preferred_username', 'email', 'sub'])
        
    user_id = user_creds.get('sub')
    user_name = user_creds.get('preferred_username')

    # test to get user
    User(u_id=user_id, name=user_name, last_login="JETZT GARAD XD").save()
    user = repo.retrieveUser(user_id)

    access_token = create_access_token(identity=user_id, expires_delta=datetime.timedelta(seconds=10))
    refresh_token = create_refresh_token(identity=user_id)

    print("a_token: %s, r_token: %s" % (access_token, refresh_token))

    redir = render_template('/profile/index.html',
                            access=access_token, refresh=refresh_token)
    return redir


@auth.route('/logout')
@jwt_required
def logout():
    if oidc.user_loggedin:
        refresh_token = oidc.get_refresh_token()
        access_token = oidc.get_access_token()
        logoutSession(refresh_token, access_token)
        oidc.logout()
        print("user has been logged out.")
        return "You've been logged out. <a href='/auth'>Back</a>"
    #logoutSession(refresh_token, access_token)
    return "You've been logged out."


@auth.route('/test')
@jwt_required
def test():
    current_user = get_jwt_identity()
    print(current_user)
    return 'moin!'


@auth.route('/refresh_token', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)

    print("current user: %s" % current_user)
    return access_token


@auth.route('authorization_complete')
def redirectProfile():
    return redirect(url_for('profile.index'))

