from flask import Blueprint, abort

login = Blueprint('login', __name__)

@login.route('/name')
def name():
    return 'mein name ist thomas' 