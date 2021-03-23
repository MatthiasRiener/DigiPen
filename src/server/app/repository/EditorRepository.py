from .AuthenticationRepository import AuthenticationRepository
from .PresentationRepository import PresentationRepository
from .CanvasRepository import CanvasRepository

authRepo = AuthenticationRepository(testing=False)
presRepo = PresentationRepository(testing=False)
canvasRepo = CanvasRepository(testing=False)

import json
from bson import json_util

class EditorRepository():
    def __init__(self, testing):
        self.testing = testing
    def retrieveData(self, p_id, u_id):
        pres = json.loads(presRepo.getPresentation(p_id=p_id).to_json())
        presUsers = presRepo.getUsersFromPresentation(p_id=p_id)
        ownUser = authRepo.retrieveUser(user_id=u_id)


        canvas = json.loads(json_util.dumps(canvasRepo.getCanvas(p_id=p_id)))


        print(canvas)
        return json.dumps({"pres": pres, "users": presUsers, "ownUser": ownUser, "canvas": canvas})
    
    def updateCanvas(self, p_id, canvas, c_id, width, height):
        canvasRepo.updateCanvas(p_id, canvas, c_id,  width, height)

        return json.dumps({"updated": 1})