from ..models.TaskList import TaskList
from ..models.Task import Task
import uuid
from ..db.settings import mongoclient

import json

from .PresentationRepository import PresentationRepository

presRepo = PresentationRepository(testing=True)


class TaskRepository():
    def __init__(self, testing):
        self.testing = testing

    def createTaskList(self, p_id):
        TaskList(p_id=p_id, t_id=str(uuid.uuid4())).save()

        print("task created!!! :D")

    def getPresentationsForTask(self, u_id):
        pres = presRepo.getUsersPresentation(user_id=u_id)
        
        for p in pres:
            print(p["_id"])
            color = self.getColor(p["_id"])
            print(color)
            p["color"] = color
        return json.dumps({"res": pres})

    def getColor(self, p_id):
        taskList = TaskList.objects(p_id=p_id).first()

        if taskList is None:
            return '#555555'
        return taskList.t_color
    def deleteAllTasks(self):
        if self.testing:
            Task.objects().delete()
            TaskList.objects().delete()
            return 'All tasks dropped!'
        else:
            return 'You do not have the permission to do that.'
