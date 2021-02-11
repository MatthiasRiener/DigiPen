from ..models.TaskList import TaskList
from ..models.Task import Task
import uuid
from ..db.settings import mongoclient


class TaskRepository():
    def __init__(self, testing):
        self.testing = testing

    def createTaskList(self, p_id):
        # TaskList(p_id=p_id, t_id=str(uuid.uuid4())).save()
        mongoclient.db['tasklist'].insert_one({'p_id': p_id, 'canvas': 
            {"objects": [{"type": "rect", "left": 50, "top": 50, "width": 20, "height": 20, "fill": "green", "overlayFill": None, "stroke": None, "strokeWidth": 1, "strokeDashArray": None, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": False, "flipY": False, "opacity": 1, "selectable": True, "hasControls": True, "hasBorders": True, "hasRotatingPoint": False, "transparentCorners": True, "perPixelTargetFind": False, "rx": 0, "ry": 0}], "background": "rgba(0, 0, 0, 0)"
            }})
        print("task created!!! :D")

    def deleteAllTasks(self):
        if testing:
            Task.objects().delete()
            TaskList.objects().delete()
            return 'All tasks dropped!'
        else:
            return 'You do not have the permission to do that.'
