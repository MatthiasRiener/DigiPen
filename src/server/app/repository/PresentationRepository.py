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

    def createPresentation(self, user_id):
        return ''
    def dropAll():
        if self.testing:
            Presentation.objects().delete()
            return 'All presentations deleted...'
        else:
            return "You don't have the permission for that."