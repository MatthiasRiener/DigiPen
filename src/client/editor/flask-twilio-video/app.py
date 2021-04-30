import os
from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, render_template, request, abort
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant
import json



twilio_account_sid = "AC5f961ea052b5bbdde0ec5b73942b0eb3"
twilio_api_key_sid = "SKbf33ebca337a7e32451e4c7344c94a69"
twilio_api_key_secret = "J4rFopujtBdZgRLpzLVwNkAEs0Ll1KwB"

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    #username = request.get_json(force=True).get('username')
    username = request.get_json(force=True).get('username')
    if not username:
        abort(401)

    print(username) 

    token = AccessToken(twilio_account_sid, twilio_api_key_sid,
                        twilio_api_key_secret, identity=username)
    token.add_grant(VideoGrant(room='My Room'))

    print("this is still working...")
    return {'token': token.to_jwt().decode()}
