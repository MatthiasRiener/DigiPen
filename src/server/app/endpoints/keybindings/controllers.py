from ...db.settings import db, oidc
from flask import Flask, Blueprint, render_template, abort, g, request

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, set_access_cookies, get_jti,
                                set_refresh_cookies, unset_jwt_cookies, decode_token)

keybinding = Blueprint("keybinding", __name__,
                    static_folder="static", template_folder="templates")

from ...repository.KeybindingRepository import KeybindingRepository
import json

keyRepo = KeybindingRepository(testing=False)

@keybinding.route('/')
def index():
    return render_template('/keybinding/index.html')


@keybinding.route('/getKeybinding')
@jwt_required
def getKeybindingRoute():
    u_id = get_jwt_identity()

    res = keyRepo.getKeybindings(u_id)
    return json.dumps({"res": res})


@keybinding.route('/saveKeybinding', methods=["POST"])
@jwt_required
def saveKeybindingRoute():
    u_id = get_jwt_identity()
    data = request.form
    print(data["keybinding"])
    keybinds = json.loads(data["keybinding"])
    print(u_id)
    keyRepo.updateKeybinds(keybinds, u_id)
    return json.dumps({"res": u_id})