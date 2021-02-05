import pytest
from ..app.repository.AuthenticationRepository import AuthenticationRepository
import json
import re
import uuid 
import time

from ..app.models.User import User
from mongoengine import disconnect, connect
# from datetime import datetime, timedelta
   
auth = AuthenticationRepository(testing=True) 


@pytest.fixture(scope="session", autouse=True)
def app():
    disconnect()
    db = connect('testing_db',
        host="localhost",
        username="root",
        password="rootpassword",
        authentication_source='admin')
    
    auth.deleteAll()

    # clear db to run tests
    
keycloakid = str(uuid.uuid4())
# lastlogin = datetime.today().strftime("%Y-%m-%d %H:%M:%S")
lastlogin = time.time()


@pytest.mark.parametrize('user_id, name, email, img, last_login, created, result', [
    (keycloakid, "Max", "max@mustermail.at", None, lastlogin, lastlogin, 1),
    (str(uuid.uuid4()), "Max", "max@mustermail.at",None, None, lastlogin, "Last login must not be None"),
    (str(uuid.uuid4()), "Max", "max@mustermail.at",None, lastlogin, None, "The time when the user was created must not be None"),
    (str(uuid.uuid4()), "Max123", "max@mustermail.at", None, lastlogin, lastlogin, "The username can only contain alphabetical letters"),
    (str(uuid.uuid4()), "Max", "max@mustermail.at", None, str(time.time()), lastlogin, "The time format of last login is invalid. It has to be an integer"),
    (str(uuid.uuid4()), "Max", "max@mustermail.at", None, time.time(), str(lastlogin), "The time format of created is invalid. It has to be an integer"),
    (keycloakid, "Max", "max@mustermail.at", None, lastlogin, lastlogin, 1),
    (str(uuid.uuid4()), None, "max@mustermail.at", None, lastlogin, lastlogin, "No information was given regarding the users username"),
    (str(uuid.uuid4()), "Max", "max@mustermail.at", None, lastlogin * 2, lastlogin, "Last login must not be in the future"),
    (str(uuid.uuid4()), "Max", "max@mustermail.at", None, lastlogin, lastlogin * 2, "Created must not be in the future"),
    (str(uuid.uuid4()), "Max", "max@mustermail.at", None, lastlogin / 2, lastlogin, "Last login has to be equal/greater then created"),
    (str(uuid.uuid4()), "Max", None, None, lastlogin, lastlogin, "Email must not be None"),
    (str(uuid.uuid4()), "Max", 1, None, lastlogin, lastlogin, "Email must be a String"),
])
def test_createUser(user_id, name, email, img, last_login, created, result):
    if result == 1:
        assert auth.createUser(user_id=user_id, name=name, email=email, img=img, last_login=last_login, created=created) == auth.retrieveUser(user_id=user_id)
    else:
        assert auth.createUser(user_id=user_id, name=name, email=email, img=img, last_login=last_login, created=created) == result

dummyid = str(uuid.uuid4())

@pytest.mark.parametrize('user_id, result', [
    ("abc-av-ac-agg", "Invalid information was given regarding the users userid"),
    (dummyid, "No user was retrieved with the userid %s" % (dummyid)),
    (None, "Invalid information was given regarding the users userid")
])
def test_retrieveUser(user_id, result):
    assert auth.retrieveUser(user_id) == result or type(result) is object


@pytest.mark.parametrize('x, y, result', [
    (10, 10, 20),
    (10, None, 10),
    (None, 10, 10)
])
def test_add(x, y, result):
    assert auth.add(x, y) == result


@pytest.mark.parametrize('x, y, result', [
    (10, 10, 0),
    (10, None, 10),
    (None, 10, -10)
])
def test_sub(x, y, result):
    assert auth.sub(x, y) == result


@pytest.mark.parametrize('data, result', [
    ('    ', ''),
    ('Jonas Himmetsberger', 'JonasHimmetsberger'),
    ('  Jonas Himmetsberger  ', 'JonasHimmetsberger'),
    ('  JonasHimmetsberger  ', 'JonasHimmetsberger'),
    ('JonasHimmetsberger', 'JonasHimmetsberger'),
    (None, '')
])
def test_remove_spaces(data, result):
    assert auth.remove_spaces(data) == result
