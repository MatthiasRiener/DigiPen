import os
from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, render_template, request, abort
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant
import json

dotenv_path = join(dirname(__file__),  '.env')
load_dotenv(dotenv_path)
twilio_account_sid = "AC5f961ea052b5bbdde0ec5b73942b0eb3"
twilio_api_key_sid = "SKbad2fdd246b00d078b6d2ffbd9b95ad5"
twilio_api_key_secret = "JFtF6R5WgBekF4nbOZsOrKPnYl9WtkkW"

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    #username = request.get_json(force=True).get('username')
    username = "Matthias"
    if not username:
        abort(401)

    print(username) 

    token = AccessToken(twilio_account_sid, twilio_api_key_sid,
                        twilio_api_key_secret, identity=username)
    token.add_grant(VideoGrant(room='My Room'))

    print("this is still working...", token.to_jwt())
    token = token.to_jwt()
    return json.dumps({"token": str(token)})
