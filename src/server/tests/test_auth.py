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

# last login, created nochmal überprüfen (datetime.today() -> time.time())

@pytest.mark.parametrize('user_id, name, img, last_login, created, result', [
    (keycloakid, "Max", None, lastlogin, lastlogin, "User %s was successfully inserted." % (keycloakid)),
    (keycloakid, "Max", None, None, lastlogin, "Last login must not be None"),
    (keycloakid, "Max", None, lastlogin, None, "The time when the user was created must not be None"),
    (str(uuid.uuid4()), "Max123", None, lastlogin, lastlogin, "The username can only contain alphabetical letters"),
    (str(uuid.uuid4()), "Max", None, str(time.time()), lastlogin, "The time format of last login is invalid. It has to a integer (Bsp.: %s)" % (lastlogin)),
    (str(uuid.uuid4()), "Max", None, time.time(), str(lastlogin), "The time format of created is invalid. It has to a integer (Bsp.: %s)" % (lastlogin)),
    (keycloakid, "Max", None, lastlogin, lastlogin, "There is already a user with the userid %s" % (keycloakid)),
    (str(uuid.uuid4()), None, None, lastlogin, lastlogin, "No information was given regarding the users username"),
    (str(uuid.uuid4()), "Max", None, lastlogin * 2, lastlogin, "Last login must not be in the future"),
    (str(uuid.uuid4()), "Max", None, lastlogin, lastlogin * 2, "Created must not be in the future"),
    (str(uuid.uuid4()), "Max", None, lastlogin / 2, lastlogin, "Last login be equal/greater then created"),
    (None, None, None, None, None, "No information was given")
])
def test_createUser(user_id, name, img, last_login, created, result):
    assert auth.createUser(user_id, name, img, last_login) == result

dummyid = str(uuid.uuid4())

@pytest.mark.parametrize('user_id, result', [
    (keycloakid, "Successfully retrieved user with the userid: %s" % (keycloakid)),
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
