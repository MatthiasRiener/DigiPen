from ..models.Workspace import Workspace
from ..db.settings import mongoclient

from .CustomException import CustomException
import time
import json

class WorkspaceRepository():

    def __init__(self, testing):
        self.testing = testing

    def createWorkspace(self, name, users, img, creator):

        if name is None:
            return CustomException("Name must not be None").__str__()

        if type(name) is not str:
            return CustomException("Name must be a string").__str__()

        Workspace(w_id=str(time.time()), w_name=name, w_img=img, w_users=users).save()
        return json.dumps({"workspaces": self.getRepoCounter(u_id=creator)})

    def getWorkspaces(self, u_id):
        spaces = mongoclient.db['workspace'].find({"w_users": u_id})
        workspaces = list()

        for sp in spaces:
            workspaces.append(sp)
        return workspaces   


    def getRepoCounter(self, u_id):
        return Workspace.objects(w_users__in=[u_id]).count()

    def deleteAll(self):
        if self.testing:
            Workspace.objects().delete()