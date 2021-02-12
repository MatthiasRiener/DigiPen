from ..models.Presentation import Presentation
from ..models.TaskList import TaskList
import time
import uuid
import json

from bson import json_util
from .TaskRepository import TaskRepository
from .CanvasRepository import CanvasRepository


class PresentationRepository():
    def __init__(self, testing):
        self.testing = testing
        self.taskRepo = TaskRepository(testing=False)
        self.canvasRepo = CanvasRepository(testing=False)

    def requestPresentation(self, u_id):
        p_id = str(uuid.uuid4())
        p_name = "Spicy Cakes and horny Dogs"
        pres = Presentation(p_id=p_id, name=p_name,
                            creator=u_id, created=time.time(), users=[{"status": "accepted", "u_id":u_id}]).save()
        return json.dumps({"status": 1, "id": p_id, "name": p_name})

    def createPresentation(self, user_id, data):
        print(data)
        p_id = data['id']
        p_name = data['name']
        p_created = time.time()
        p_keywords = data.getlist('keywords[]')
        p_export = bool(data['export'])
        p_timeline = bool(data['timeline'])
        p_visibility = bool(data['public'])

        Presentation.objects(p_id=p_id).first().update(set__name=p_name, set__export=p_export,
                                                       set__timeline=p_timeline, set__keywords=p_keywords, set__public=p_visibility)
        self.taskRepo.createTaskList(p_id=p_id)
        self.canvasRepo.createCanvas(p_id=p_id)
        return json.dumps({'status': 1, 'p_id': p_id})

    def getTemplates(self):
        presentations = tuple()

        for index, pres in enumerate(Presentation.objects(public=True)):
            
            res = pres.to_mongo()
            #res['lol'] = self.canvasRepo.getCanvas(p_id=pres.p_id)
            res['canvas'] = json.loads(json_util.dumps(self.canvasRepo.getCanvas(p_id=pres.p_id)))
            presentations = presentations + (res, )
        return json.dumps({"res": presentations})

    def getOwnPresentation(self, user_id):
        presentations = []

        for pres in Presentation.objects(creator=user_id):
            presentations.append(pres.to_mongo())
        
        return presentations

    def inviteUser(self, user_id, p_id):
        user = dict()
        user['status'] = 'pending'
        user['u_id'] = user_id

        Presentation.objects(p_id=p_id).first().update(add_to_set__users=[user])
        
        return self.getPresentation(p_id=p_id)
    def getPresentation(self, p_id):
        return Presentation.objects(p_id=p_id).first()
    
    def getNotInvitedUsers(self, p_id, users):
        pres = self.getPresentation(p_id=p_id)
        dummy_users = []

        print(pres.to_mongo()["users"])
        for user in users:
            isExisting = any(x["u_id"] == user['_id'] for x in pres.to_mongo()["users"])
            if not isExisting:
                dummy_users.append(user)
        return dummy_users

    def dropAll(self):
        if self.testing:
            Presentation.objects().delete()
            return 'All presentations deleted...'
        else:
            return "You don't have the permission for that."
