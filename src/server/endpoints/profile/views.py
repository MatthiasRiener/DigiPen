from ..db.settings import mongo, oidc
from flask import Flask, Blueprint, render_template, abort, g
from oauth2client.client import OAuth2Credentials
             

profile = Blueprint("profile", __name__, static_folder="static", template_folder="templates")

@profile.route('/<user_id>')
@oidc.accept_token(require_token=True, scopes_required=['openid'])
def index(user_id):
    username= g.oidc_token_info['preferred_username']
    
    if oidc.user_getfield('sub') == user_id and mongo.db.usersettings.find_one({"user_id": user_id}) is not None:
         return render_template('/profile/index.html', username=username);
    else:
         abort(404)

   


