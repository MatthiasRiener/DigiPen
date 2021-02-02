from ..models.Workspace import Workspace
from .AuthenticationRepository import AuthenticationRepository

import time
import json
uRepo = AuthenticationRepository(testing=False)

class WorkspaceRepository():

    def __init__(self, testing):
        self.testing = testing

    def createWorkspace(self, name, users, img, creator):

        Workspace(w_id=str(time.time()), w_name=name, w_img=img, w_users=uRepo.getUserIds(users=users)).save()
        return json.dumps({"workspaces": self.getRepoCounter(u_id=creator)})

    def getRepoCounter(self, u_id):
        return Workspace.objects(w_users__in=[u_id]).count()