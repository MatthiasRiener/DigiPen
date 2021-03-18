import pytest
from ..app.repository.CanvasRepository import CanvasRepository

import uuid

from mongoengine import disconnect, connect
# from datetime import datetime, timedelta

canvasRepo = CanvasRepository(testing=True)


@pytest.fixture(scope="session", autouse=True)
def app():
    disconnect()
    db = connect('testing_db',
                 host="localhost",
                 username="root",
                 password="rootpassword",
                 authentication_source='admin')

    canvasRepo.deleteAll()

    # clear db to run tests


canvasid = str(uuid.uuid4())


def canvasRepo_createCanvas():
    canvasRepo.createCanvas("1")


canvasRepo_createCanvas()


@pytest.mark.parametrize('p_id, result', [
    (1, "")
])
def test_createCanvas(p_id, result):
    print(canvasRepo.getCanvas(p_id=canvasid))
    assert canvasRepo.getCanvas(
        p_id=p_id) == result
