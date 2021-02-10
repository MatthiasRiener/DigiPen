from ..models.Presentation import Presentation
import time
import uuid
import json

class PresentationRepository():
    def __init__(self, testing):
        self.testing = testing

    def requestPresentation(self, u_id):
        p_id = str(uuid.uuid4())
        p_name = "Spicy Cakes and horny Dogs"
        pres = Presentation(p_id=p_id, name=p_name, canvas_id=str(uuid.uuid4()), creator=u_id, created=time.time()).save()
        return json.dumps({"status": 1, "id": p_id, "name": p_name})

    def createPresentation(self, user_id, data):
        print(data)
        p_id = data['id']
        p_name = data['name']
        p_created = time.time()
        p_keywords = data.getlist('keywords[]')
        p_export = bool(data['export'])
        p_timeline = bool(data['timeline'])

        Presentation.objects(p_id=p_id).first().update(set__name=p_name, set__export=p_export, set__timeline=p_timeline, set__keywords=p_keywords)
        return json.dumps({'status': 1, 'p_id': p_id})

    def dropAll():
        if self.testing:
            Presentation.objects().delete()
            return 'All presentations deleted...'
        else:
            return "You don't have the permission for that."