from ...db.settings import db, oidc
from flask import Flask, Blueprint, render_template, abort, g
from oauth2client.client import OAuth2Credentials

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)


from ...models.User import User
from ...repository.AuthenticationRepository import AuthenticationRepository


profile = Blueprint("profile", __name__,
                    static_folder="static", template_folder="templates")

repo = AuthenticationRepository()

@profile.route('/')
def index():
    return render_template('/profile/index.html')


@profile.route('/user/')
@jwt_required
def getUserData():
    cur_user = get_jwt_identity()
    user = repo.retrieveUser(cur_user)

    return user.as_json()

