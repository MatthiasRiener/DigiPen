from ...db.settings import db, oidc
from flask import Flask, Blueprint, render_template, abort, g
from oauth2client.client import OAuth2Credentials


profile = Blueprint("profile", __name__,
                    static_folder="static", template_folder="templates")


@profile.route('/')
def index():
    return render_template('/profile/index.html')

@profile.route('/user/', methods=['POST'])
@oidc.accept_token(require_token=True, scopes_required=['openid'])
def getUserData():
    return 'Hello Peter!'

