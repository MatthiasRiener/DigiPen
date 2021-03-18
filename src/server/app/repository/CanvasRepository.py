from ..models.Canvas import Canvas
from ..db.settings import mongoclient

import json
import os
from bson import json_util


class CanvasRepository():
    def __init__(self, testing):
        self.testing = testing

    def createCanvas(self, p_id):
        canvasObj = self.readCanvasJson()
        pidJSON = {"p_id": p_id}
        canvasObj[0].update(pidJSON)

        print(canvasObj[0])

        mongoclient.db['canvas'].insert_one(canvasObj[0])
        print("Canvas created... :D")

    def getCanvas(self, p_id):
        return mongoclient.db['canvas'].find_one({"p_id": p_id})

    def updateCanvas(self, p_id, canvas, width, height):
        mongoclient.db['canvas'].update({"p_id": p_id}, {
                                        "$set": {"canvas": canvas, 'latestWidth': width, 'latestHeight': height}})
        return "updated canvas"

    def deleteAll(self):
        if self.testing:
            Canvas.objects().delete()
            return 'All canvases deleted...'
        else:
            return 'You do not have the permission to do that.'

    def readCanvasJson(self):
        __location__ = os.path.realpath(
            os.path.join(os.getcwd(), os.path.dirname(__file__)))
        with open(os.path.join(__location__, 'shortcuts.json')) as json_file:
            data = json.load(json_file)

        return data
