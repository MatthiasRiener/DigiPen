from ...db.settings import db, oidc
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials


from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)




dashboard = Blueprint("dashboard", __name__,
                    static_folder="static", template_folder="templates")



@dashboard.route('/', methods=["GET"])
def index():
    return render_template('/dashboard/index.html')