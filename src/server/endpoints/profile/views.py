from ..auth.views import oidc
from flask import Flask, Blueprint, render_template

profile = Blueprint("profile", __name__, static_folder="static", template_folder="templates")

@profile.route('/')
def index():
    return render_template('/profile/index.html');


