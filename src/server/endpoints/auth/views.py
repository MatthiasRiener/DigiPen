from flask import Blueprint, current_app as app
from flask_oidc import OpenIDConnect

auth = Blueprint('auth', __name__, static_folder="static", template_folder="templates")
oidc = OpenIDConnect()

# der openid client soll vor dem ersten request abgesendet werden, method notwendig weil app nur in request zugreifbar ist
@auth.before_app_first_request
def initializeOidc():
    oidc.init_app(app)

@auth.route('/')
def index():   
    return 'Welcome back.'

@auth.route('/login')
@oidc.require_login
def login():
    print("logged in")
    return 'LOL'

