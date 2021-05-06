import pytest
from ..app.repository.WorkspaceRepository import WorkspaceRepository
import json
import re
import uuid 
import time

from ..app.models.Workspace import Workspace
from mongoengine import disconnect, connect

workspace = WorkspaceRepository(testing=True) 

@pytest.fixture(scope="session", autouse=True)
def app():
    disconnect()
    db = connect('testing_db',
        host="localhost",
        username="root",
        password="rootpassword",
        authentication_source='admin')
    
    workspace.deleteAll()

    # clear db to run tests
    
keycloakid = str(uuid.uuid4())
# lastlogin = datetime.today().strftime("%Y-%m-%d %H:%M:%S")
lastlogin = time.time()

@pytest.mark.parametrize('name, users, img, creator, result', [
    (None, None, None, keycloakid, "Name must not be None"),
    (1, None, None, keycloakid, "Name must be a string")
])
def test_createWorkspace(name, users, img, creator, result):
    assert workspace.createWorkspace(name=name, users=users, img=img, creator=creator) == result