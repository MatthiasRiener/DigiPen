from flask import Blueprint, render_template, current_app as app
from flask_oidc import OpenIDConnect

auth = Blueprint('auth', __name__, static_folder="static", template_folder="templates")
oidc = OpenIDConnect()

# der openid client soll vor dem ersten request abgesendet werden, method notwendig weil app nur in request zugreifbar ist
@auth.before_app_first_request
def initializeOidc():
    oidc.init_app(app)

@auth.route('/')
def index():   
    return "Welcome back!"

@auth.route('/login')
@oidc.require_login
def login():
    info = oidc.get_access_token()
    return str(info)

@auth.route('/logout')
def logout():
    oidc.logout()
    return "You've been logged out."

@auth.route('/templatetest')
def test():
    return render_template('test.html')