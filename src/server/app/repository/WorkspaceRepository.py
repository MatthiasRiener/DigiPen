from ..models.Workspace import Workspace
from .AuthenticationRepository import AuthenticationRepository

import time
uRepo = AuthenticationRepository(testing=False)

class WorkspaceRepository():

    def __init__(self, testing):
        self.testing = testing

    def createWorkspace(self, name, users, img):

        Workspace(w_id=str(time.time()), w_name=name, w_img=img, w_users=uRepo.getUserIds(users=users)).save()
        return 'Workspace created...'