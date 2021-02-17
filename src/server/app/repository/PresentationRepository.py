from ..models.Presentation import Presentation
from ..models.TaskList import TaskList
import time
import uuid
import json

from bson import json_util
from ..db.settings import mongoclient

# from .TaskRepository import TaskRepository
from .CanvasRepository import CanvasRepository
from .AuthenticationRepository import AuthenticationRepository

from .AuthenticationRepository import AuthenticationRepository
authRepo = AuthenticationRepository(testing=False)


class PresentationRepository():
    def __init__(self, testing):
        self.testing = testing

    def requestPresentation(self, u_id):
        p_id = str(uuid.uuid4())
        p_name = "Untitled"
        pres = Presentation(p_id=p_id, name=p_name,
                            creator=u_id, created=time.time(), users=[{"status": "accepted", "u_id": u_id}]).save()
        return json.dumps({"status": 1, "id": p_id, "name": p_name}), p_id

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

        from .TaskRepository import TaskRepository
        from .CanvasRepository import CanvasRepository

        taskRepo = TaskRepository(testing=False)
        canvasRepo = CanvasRepository(testing=False)

        taskRepo.createTaskList(p_id=p_id)
        canvasRepo.createCanvas(p_id=p_id)

        return json.dumps({'status': 1, 'p_id': p_id})

    def getTemplates(self):
        from .CanvasRepository import CanvasRepository
        canvasRepo = CanvasRepository(testing=False)

        presentations = tuple()

        for index, pres in enumerate(Presentation.objects(public=True)):

            res = pres.to_mongo()
            # res['lol'] = canvasRepo.getCanvas(p_id=pres.p_id)
            res['canvas'] = json.loads(json_util.dumps(
                canvasRepo.getCanvas(p_id=pres.p_id)))
            presentations = presentations + (res, )
        return json.dumps({"res": presentations})

    def getOwnPresentation(self, user_id):
        presentations = []

        for pres in Presentation.objects(creator=user_id):
            presentations.append(pres.to_mongo())

        return presentations
    def getUsersFromPresentation(self, p_id):
        users = []
        for user in Presentation.objects(p_id=p_id).first().users:
            print(user["u_id"])
            users.append(authRepo.retrieveUser(user_id=user["u_id"]))
        return users;

    def getUsersPresentation(self, user_id):
        presentations = []
        print(user_id)
        pres = mongoclient.db['presentation'].find({"users": {"$elemMatch": {"u_id": user_id}}})

        for p in pres:
            presentations.append(p)
        return presentations

    def inviteUser(self, user_id, p_id):
        user = dict()
        user['status'] = 'pending'
        user['u_id'] = user_id

        Presentation.objects(p_id=p_id).first().update(
            add_to_set__users=[user])

        return self.getPresentation(p_id=p_id)

    def getPresentation(self, p_id):
        return Presentation.objects(p_id=p_id).first()

    def getNotInvitedUsers(self, p_id, users):
        pres = self.getPresentation(p_id=p_id)
        dummy_users = []

        print(pres.to_mongo()["users"])
        for user in users:
            isExisting = any(x["u_id"] == user['_id']
                             for x in pres.to_mongo()["users"])
            if not isExisting:
                dummy_users.append(user)
        return dummy_users

    def getInvites(self, user_id):
        presentations = tuple()
        pres = Presentation.objects(
            __raw__={"users": {"$in": [{"status": "pending", "u_id": user_id}]}})
        for index, p in enumerate(pres):
            present = p.to_mongo()
            present["creator"] = json.loads(json_util.dumps(
                authRepo.retrieveUser(user_id=p.creator)))
            presentations = presentations + (present, )

        return json.dumps({"count": len(presentations), "res": presentations})

    def handleInvitePressed(self, status, p_id, user_id):

        if status == 'accepted':
            pres = mongoclient.db['presentation'].update({"_id": p_id, "users.u_id": user_id}, {
                                                         "$set": {"users.$.status": "accepted"}}, False, True)
            status = 1
        elif status == 'declined':
            pres = mongoclient.db['presentation'].update(
                {"_id": p_id}, {"$pull": {"users": {"u_id": user_id}}})
            status = 0

        return json.dumps({"status": status, "p_id": p_id, "user": authRepo.repo.retrieveUser(user_id)})

    def dropAll(self):
        if self.testing:
            Presentation.objects().delete()
            return 'All presentations deleted...'
        else:
            return "You don't have the permission for that."
