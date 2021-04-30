


from ...db.settings import db, oidc
from flask import Flask, Blueprint, render_template, abort, g, request
from oauth2client.client import OAuth2Credentials

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)





import json, random



tippsBlue = Blueprint("tipps", __name__,
                    static_folder="static", template_folder="templates")


tipps = [
    "You can change your user information on the profile page.",
    "You can use keybindings to become a master at creating presentations",
    "View your tasks on the Task Management Page."
]


@tippsBlue.route('/getTipp')
def getRandomTippRoute():
    return json.dumps({"res": random.choice(tipps)})