from ..models.TaskList import TaskList
from ..models.Task import Task
import uuid


class TaskRepository():
    def __init__(self, testing):
        self.testing = testing

    def createTaskList(self, p_id):
        TaskList(p_id=p_id, t_id=str(uuid.uuid4())).save()
        print("task created!!! :D")

    def deleteAllTasks(self):
        if testing:
            Task.objects().delete()
            TaskList.objects().delete()
            return 'All tasks dropped!'
        else:
            return 'You do not have the permission to do that.'