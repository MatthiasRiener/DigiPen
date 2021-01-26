from ..app.reprository.AuthenticationRepository import AuthenticationRepository
import pytest
import time

auth = AuthenticationRepository()

@pytest.mark.parametrize('user_id, name, img, last_login, result', [
    (1, "Max", None, time.time(), "User 1 was successfully inserted"),
    (2, "Max123", None, None, "The username can only contain alphabetical letters"),
    (3, "Max", None, "invalid", "The time format is invalid"),
    (4, "Max", None, None, "User 4 was successfully inserted."),
    (1, "Max", None, None, "There is already a user with the userid 1"),
    (5, None, None, None, "No information was given regarding the users username"),
    (None, None, None, None, "No information was given regarding the users userid")
])
def test_createUser(user_id, name, img, last_login, result):
    assert auth.createUser(user_id, name, img, last_login) == result

@pytest.mark.parametrize('user_id, result', [
    (None, "No information was given regarding the users userid"),
    (1, )
])
def test_retrieveUser(user_id, result):
    assert auth.retrieveUser(user_id) == result


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
