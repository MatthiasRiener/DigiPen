from flask import Flask, render_template
from app.endpoints.auth.controllers import auth
from app.endpoints.error.controllers import pagenotfound
from app.endpoints.profile.controllers import profile
from app.endpoints.workspace.controllers import workspace
from app.endpoints.dashboard.controllers import dashboard
from app.endpoints.landing_page.controllers import landing_page
from app.endpoints.task_management.controllers import task_m
from app.endpoints.editor.controllers import editor
from app.endpoints.keybindings.controllers import keybinding
from app.endpoints.admin_panel.controllers import panel
from app.endpoints.location_tracker.controllers import location
from app.endpoints.issues.controller import iss

from app.db.settings import db, oidc, jwt, socketio, mongoclient


app = Flask(__name__, template_folder="./app/files/templates",
            static_folder="./app/files/static")

app.config.update({
    'SECRET_KEY': 'SomethingNotEntirelySecret',
    'TESTING': True,
    'DEBUG': True,
    'OIDC_CLIENT_SECRETS': 'client_secrets.json',
    'OIDC_ID_TOKEN_COOKIE_SECURE': False,
    'OIDC_REQUIRE_VERIFIED_EMAIL': False,
    'OIDC_USER_INFO_ENABLED': True,
    'OIDC_OPENID_REALM': 'flask-demo',
    'OIDC_SCOPES': ['openid', 'email', 'profile', 'roles'],
    'OIDC_INTROSPECTION_AUTH_METHOD': 'client_secret_post',
    'MONGO_URI': "mongodb://root:rootpassword@localhost:27017/slideadb?authSource=admin",
    'JWT_SECRET_KEY': 'jwt-secret-string'
})

app.config['MONGODB_SETTINGS'] = {
    'db': 'slideadb',
    'host': 'localhost',
    'port': 27017,
    'username': 'root',
    'password': 'rootpassword',
    'authentication_source': 'admin',
    'alias':'default'
}

app.config['MONGODB_CONNECT'] = False
# intializing for mongo and oidc
db.init_app(app)
oidc.init_app(app)
jwt.init_app(app)
socketio.init_app(app)
mongoclient.init_app(app)

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(profile, url_prefix="/profile")
app.register_blueprint(workspace, url_prefix="/workspace")
app.register_blueprint(dashboard, url_prefix="/dashboard")
app.register_blueprint(task_m, url_prefix="/task")
app.register_blueprint(editor, url_prefix="/editor")
app.register_blueprint(keybinding, url_prefix="/keybinding")
app.register_blueprint(panel, url_prefix="/admin")
app.register_blueprint(location, url_prefix="/location")
app.register_blueprint(iss, url_prefix="/issues")

app.register_blueprint(landing_page)

app.register_error_handler(404, pagenotfound)


from decorators import dRR

@app.before_request
def before_request_route():
    dRR()
