from ..models.Canvas import Canvas
from ..db.settings import mongoclient

class CanvasRepository():
    def __init__(self, testing):
        self.testing = testing
    
    def createCanvas(self, p_id):
        mongoclient.db['canvas'].insert_one({'p_id': p_id, 'canvas': 
            {"objects": [{"type": "rect", "left": 50, "top": 50, "width": 20, "height": 20, "fill": "green", "overlayFill": None, "stroke": None, "strokeWidth": 1, "strokeDashArray": None, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": False, "flipY": False, "opacity": 1, "selectable": True, "hasControls": True, "hasBorders": True, "hasRotatingPoint": False, "transparentCorners": True, "perPixelTargetFind": False, "rx": 0, "ry": 0}], "background": "rgba(0, 0, 0, 0)"
            }})
        print("Canvas created... :D")

    def getCanvas(self, p_id):
        return mongoclient.db['canvas'].find_one({"p_id": p_id})
    def deleteAll(self):
        if self.testing:
            Canvas.objects().delete()
            return 'All canvases deleted...'
        else:
            return 'You do not have the permission to do that.'