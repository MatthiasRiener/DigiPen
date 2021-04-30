from ..models.Canvas import Canvas
from ..db.settings import mongoclient

import json
import time
import os
from bson import json_util

from bson.objectid import ObjectId
from ..repository.AuthenticationRepository import AuthenticationRepository

aRepo = AuthenticationRepository(testing=False)

class CanvasRepository():
    def __init__(self, testing):
        self.testing = testing

    def createCanvas(self, p_id):
        """canvasObj = self.readCanvasJson()
        pidJSON = {"p_id": p_id}
        canvasObj[0].update(pidJSON)

        print(canvasObj[0])"""

        canvas = self.getCanvas(p_id)

        print(canvas.count())
        s_id = canvas.count()
         
        s_id += 1

        __location__ = os.path.realpath(
            os.path.join(os.getcwd(), os.path.dirname(__file__)))
        with open(os.path.join(__location__, 'canvasObj.json')) as json_file:
            data = json.load(json_file)
            res = mongoclient.db['canvas'].insert_one({"p_id": p_id, "s_id": s_id, "canvas": data})
        return self.getCanvas(p_id=p_id)



    def createSlide(self, p_id, user):
        """canvasObj = self.readCanvasJson()
        pidJSON = {"p_id": p_id}
        canvasObj[0].update(pidJSON)

        print(canvasObj[0])"""

        canvas = self.getCanvas(p_id)

        print(canvas.count())
        s_id = canvas.count()

        if s_id != 0:
            s_id += 1

        __location__ = os.path.realpath(
            os.path.join(os.getcwd(), os.path.dirname(__file__)))
        with open(os.path.join(__location__, 'canvasObj.json')) as json_file:
            data = json.load(json_file)
            res = mongoclient.db['canvas'].insert_one({"p_id": p_id, "s_id": s_id, "canvas": data, "created": time.time(), "latestChange": [aRepo.retrieveUserWithOutTimeChange(user)["name"], aRepo.retrieveUserWithOutTimeChange(user)["img"]]})
        return self.getSpecificSlide(object_id=res.inserted_id)

    def getSpecificSlide(self, object_id):
        print(object_id)
        return json.loads(json_util.dumps(mongoclient.db["canvas"].find_one({"_id": ObjectId(object_id)})))

    def getCanvas(self, p_id):
        return mongoclient.db['canvas'].find({"p_id": p_id}).sort("s_id")

    def getSlides(self, p_id):
        response = list()
        for el in self.getCanvas(p_id=p_id):

            response.append(json.loads(json_util.dumps(el)))
        return response
    def updateCanvas(self, p_id, canvas, cid,  width, height, user):
        print("updating canvas!",cid)
        print(p_id)
        print("====")
        print(canvas)

        print("========")

        if isinstance(canvas, str):
            canvas = json.loads(canvas)

        mongoclient.db['canvas'].update_one({"_id": ObjectId(cid)}, 
       {"$set": {"canvas": canvas, 'latestChange': [aRepo.retrieveUserWithOutTimeChange(user)["name"], aRepo.retrieveUserWithOutTimeChange(user)["img"]]}})
        return self.getSpecificSlide(object_id=cid)

    def deleteAll(self):
        if self.testing:
            Canvas.objects().delete()
            return 'All canvases deleted...'
        else:
            return 'You do not have the permission to do that.'

    """def readCanvasJson(self):
        __location__ = os.path.realpath(
            os.path.join(os.getcwd(), os.path.dirname(__file__)))
        with open(os.path.join(__location__, 'canvasObj.json')) as json_file:
            data = json.load(json_file)

        return data"""
