from ..models.Canvas import Canvas
from ..db.settings import mongoclient

import json
import os
from bson import json_util


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

        if s_id != 0:
            s_id += 1

        mongoclient.db['canvas'].insert_one({"p_id": p_id, "s_id": s_id, "canvas": {"objects": [{"type": "rect", "left": 50, "top": 50, "width": 20, "height": 20, "fill": "green", "overlayFill": None, "stroke": None, "strokeWidth": 1, "strokeDashArray": None, "scaleX": 1, "scaleY": 1,
                                                                                   "angle": 0, "flipX": False, "flipY": False, "opacity": 1, "selectable": True, "hasControls": True, "hasBorders": True, "hasRotatingPoint": False, "transparentCorners": True, "perPixelTargetFind": False, "rx": 0, "ry": 0}], "background": "rgba(0, 0, 0, 0)"}})
        print("Canvas created... :D")

    def getCanvas(self, p_id):
        return mongoclient.db['canvas'].find({"p_id": p_id})

    def updateCanvas(self, p_id, canvas, cid,  width, height):
        print("updating canvas!",cid)
        print(p_id)
        print("====")
        print(canvas)

        print("========")

    
        print(doc)
        mongoclient.db["canvas"].find_one_and_update(
                {"p_id": p_id, "s_id": cid},
                {"$set": {"canvas": canvas, 'latestWidth': width, 'latestHeight': height}},
                upsert=True
            )
#
 #       mongoclient.db['canvas'].update_one({"p_id": p_id, "s_id": cid}, {
  #                                      "$set": {"canvas": canvas, 'latestWidth': width, 'latestHeight': height}})
        return "updated canvas"

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
