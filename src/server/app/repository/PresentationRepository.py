from ..models.Presentation import Presentation
from ..models.TaskList import TaskList
import time
import uuid
import json

from jsonmerge import merge
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
                            creator=u_id, created=time.time()).save()
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
        presentations = []

        for pres in Presentation.objects(public=True):
            res = pres.to_mongo()
            res['canvas'] = self.canvasRepo.getCanvas(p_id=pres.p_id)
            print(res)
        return ''

    def dropAll(self):
        if self.testing:
            Presentation.objects().delete()
            return 'All presentations deleted...'
        else:
            return "You don't have the permission for that."
