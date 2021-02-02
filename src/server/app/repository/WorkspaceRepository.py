from ..models.Workspace import Workspace


class WorkspaceRepository():

    def __init__(self, testing):
        self.testing = testing

    def createWorkspace(self, name):
        Workspace(w_name=name).save()
        return 'Workspace created...'