from ..models.Workspace import Workspace
from ..db.settings import mongoclient

from .CustomException import CustomException
import time
import json
import random


class WorkspaceRepository():

    def __init__(self, testing):
        self.testing = testing

    def createWorkspace(self, name, users, creator):

        if name is None:
            return CustomException("Name must not be None").__str__()

        if type(name) is not str:
            return CustomException("Name must be a string").__str__()


        if creator not in users:
            users.append(creator)

        Workspace(w_id=str(time.time()), w_name=name, w_color=self.randomColor(), w_users=users, w_creator=creator).save()
        return json.dumps({"workspaces": self.getRepoCounter(u_id=creator)})

    def getWorkspaces(self, u_id):
        spaces = mongoclient.db['workspace'].find({"w_users": u_id}).sort([("w_name", 1)])
        workspaces = list()

        for sp in spaces:
            workspaces.append(sp)
        return workspaces   

    def randomColor(self):
        r = lambda: random.randint(0,255)
        color = '#{:02x}{:02x}{:02x}'.format(r(), r(), r()) 
        return color
    def getRepoCounter(self, u_id):
        return Workspace.objects(w_users__in=[u_id]).count()

    def deleteAll(self):
        if self.testing:
            Workspace.objects().delete()