from flask import Blueprint, abort

from keycloak.keycloak_openid import KeycloakOpenID
from keycloak import KeycloakAdmin, exceptions



auth = Blueprint('auth', __name__)

keycloak_openid = KeycloakOpenID(server_url="http://localhost:8080/auth/",
                                 client_id="flask-client",
                                 realm_name="slidea",
                                 client_secret_key="b2d6d486-a067-4d15-ac18-2fc5e9e69a17"
                                 )
keycloak_admin = KeycloakAdmin(server_url="http://localhost:8080/auth/",
                               username='admin',
                               password='Pa55w0rd',
                               realm_name="slidea",
                               user_realm_name="slidea",
                               client_id="flask-client",
                               client_secret_key="b2d6d486-a067-4d15-ac18-2fc5e9e69a17",
                               verify=True)


@auth.route('/create')
def createUser():
    token = keycloak_openid.token("rienermatthias", "test")
    

    return str(token)


@auth.route('/login')
def loginUser():
    token = None
    try:
        token = keycloak_openid.token("riesnermatthias", "test")
    except exceptions.KeycloakAuthenticationError:
        print("Invalid user credentials.")   
    return str(token)


# @login.route('/')
# def hello_world():
#     if oidc.user_loggedin:
#         return ('Hello, %s, <a href="/private">See private</a> '
#                 '<a href="/logout">Log out</a>') % \
#             oidc.user_getfield('preferred_username')
#     else:
#         return 'Welcome anonymous, <a href="/private">Log in</a>'


# @login.route('/private')
# @oidc.require_login
# def hello_me():
#     info = oidc.user_getinfo(['preferred_username', 'email', 'sub'])

#     username = info.get('preferred_username')
#     email = info.get('email')
#     user_id = info.get('sub')

#     if user_id in oidc.credentials_store:
#         try:
#             from oauth2client.client import OAuth2Credentials
#             access_token = OAuth2Credentials.from_json(oidc.credentials_store[user_id]).access_token
#             print ('access_token=<%s>' % access_token)

#         except:
#             print ("Could not access greeting-service")
#             greeting = "Hello %s" % username


#     return ("""%s your email is %s and your user_id is %s!
#                <ul>
#                  <li><a href="/">Home</a></li>
#                  <li><a href="//localhost:8080/auth/realms/slidea/account?referrer=flask-client&referrer_uri=http://localhost:5000/private&">Account</a></li>
#                 </ul>""" %
#             (greeting, email, user_id))


# @login.route('/api', methods=['POST'])
# @oidc.accept_token(require_token=True, scopes_required=['openid'])
# def hello_api():
#     return json.dumps({'hello': 'Welcome %s' % g.oidc_token_info['sub']})


# @login.route('/logout')
# def logout():
#     oidc.logout()
#     return "You've been logged out."
