from flask import Flask, render_template
from .auth.controllers import auth
from .error.views import pagenotfound
from .profile.views import profile
from .taskmanagement.views import man
from .db.settings import mongo, oidc

app = Flask(__name__, template_folder="./files/templates", static_folder="./files/static")

app.config.update({
    'SECRET_KEY': 'SomethingNotEntirelySecret',
    'TESTING': True,
    'DEBUG': True,
    'OIDC_CLIENT_SECRETS': 'client_secrets.json',
    'OIDC_ID_TOKEN_COOKIE_SECURE': False,
    'OIDC_REQUIRE_VERIFIED_EMAIL': False,
    'OIDC_USER_INFO_ENABLED': True,
    'OIDC_OPENID_REALM': 'flask-demo',
    'OIDC_SCOPES': ['openid', 'email', 'profile'],
    'OIDC_INTROSPECTION_AUTH_METHOD': 'client_secret_post',
    'MONGO_URI': "mongodb://root:rootpassword@localhost:27017/slideadb?authSource=admin",
  


})

mongo.init_app(app)
oidc.init_app(app)


app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(profile, url_prefix="/profile")
app.register_blueprint(man, url_prefix="/task")


app.register_error_handler(404, pagenotfound)

