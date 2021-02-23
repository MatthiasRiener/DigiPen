from ..models.TaskList import TaskList
from ..models.Task import Task
from ..models.Subtask import SubTask
import uuid
from ..db.settings import mongoclient
from dateutil import parser

import json
from bson import json_util
import datetime

from .PresentationRepository import PresentationRepository
from .AuthenticationRepository import AuthenticationRepository

presRepo = PresentationRepository(testing=False)
authRepo = AuthenticationRepository(testing=False)


class TaskRepository():
    def __init__(self, testing):
        self.testing = testing

    def createTaskList(self, p_id):
        TaskList(p_id=p_id).save()

        print("task created!!! :D")

    def getPresentationsForTask(self, u_id):
        pres = presRepo.getUsersPresentation(user_id=u_id)

        for p in pres:
            color = self.getColor(p["_id"])
            p["color"] = color
        return json.dumps({"res": pres})

    def getColor(self, p_id):
        taskList = TaskList.objects(p_id=p_id).first()

        if taskList is None:
            return '#555555'
        return taskList.t_color

    def checkUser(self, user_id, p_id):
        presentation = presRepo.getPresentation(p_id=p_id).to_mongo()
        presentation["color"] = self.getColor(p_id)

        print(presentation)
        return json.dumps({"pres": presentation})

    def getUsersFromPresentation(self, p_id):
        return presRepo.getUsersFromPresentation(p_id=p_id)

    def createTask(self, p_id, name, end_date, start_date, u_id, assignee, subtasks):
        task_id = str(uuid.uuid4())
        tasks = list()
        for i in range(0, len(subtasks) - 1):
            if not i % 2:
                tasks.append({"name": subtasks[i - 1], "status": subtasks[i]})

        for subtask in tasks:
            SubTask(sub_id=str(uuid.uuid4()), parent_id=task_id,
                    name=subtask["name"], status=subtask["status"]).save()
        Task(p_id=p_id, task_id=task_id, name=name, start=parser.parse(start_date),
             end=parser.parse(end_date), finished=True, creator=u_id, assignee=assignee).save()
        return ''

    def updateTask(self, t_id, p_id, name, end_date, start_date, assignee, subtasks):
        print(subtasks)
        tasks = list()
        for i in range(0, len(subtasks) - 1):
            if not i % 3:
                print(subtasks)
                print("====")
                print(subtasks[i - 1])
                tasks.append(
                    {"id": subtasks[i - 1], "name": subtasks[i - 2], "status": bool(subtasks[i])})

        for subtask in tasks:
            if not SubTask.objects(sub_id=subtask["id"]) and subtask["id"] == "not defined":
                print("creating task...", subtask["name"])

                SubTask(sub_id=str(uuid.uuid4()) , parent_id=t_id,
                    name=subtask["name"], status=subtask["status"]).save()
            else:
                print("updating task...", subtask["name"])
                SubTask.objects(sub_id=subtask["id"]).update(
                    set__name=subtask["name"], set__status=subtask["status"])


        Task.objects(task_id=t_id).first().update(set__p_id=p_id, set__name=name, set__start=parser.parse(start_date),
             set__end=parser.parse(end_date), set__finished=True,  set__assignee=assignee)
        return 'updated'
    

    def getTask(self, task_id):

        print("task_id", task_id)
        response = dict()

        task = Task.objects(task_id=task_id).first()
        subtasks = SubTask.objects(parent_id=task_id)

        response["task"] = task.to_mongo()
        response["task"]["start"] = str(response["task"]["start"])
        response["task"]["end"] = str(response["task"]["end"])

        response["task"]["assignee"] = authRepo.retrieveUser(user_id=task["assignee"])
        response["task"]["presentation"] = presRepo.getPresentation(p_id=task["p_id"]).to_mongo()

        response["subtasks"] = list()
        for sub in subtasks:
            subtaskDummy = dict()
            subtaskDummy["id"] = sub["sub_id"]
            subtaskDummy["name"] = sub["name"]
            subtaskDummy["finished"] = sub["status"]
            response["subtasks"].append(subtaskDummy)

        return response

    def getTasks(self, u_id):
        # Step 1 => Alle Presentationen in denen der Benutzer mit u_id vorhanden ist
        presentations = presRepo.getUsersPresentation(user_id=u_id)

        response = []
        # Step 2 => alle Tasklisten bekommen, die zur Präsentation gehören

        for pres in presentations:

            dummy = dict()

            dummy["id"] = pres["_id"]
            dummy["name"] = pres["name"]
            dummy["members"] = len(pres["users"])
            dummy["tasks"] = list()

            taskList = TaskList.objects(p_id=pres["_id"]).first()

            if taskList is not None:
                dummy["taskColor"] = taskList["t_color"]
            else:
                dummy["taskColor"] = "nicht vorhanden LOL! :D"

            # Step 3 => alle Tasks mit der p_id

            tasks = Task.objects(p_id=pres["_id"])

            for t in tasks:
                if t is not None:

                    dummyTask = dict()
                    dummyTask["subtasks"] = list()
                    subtasks = SubTask.objects(parent_id=t["task_id"])

                    for sub in subtasks:
                        subtaskDummy = dict()
                        subtaskDummy["name"] = sub["name"]
                        subtaskDummy["finished"] = sub["status"]
                        subtaskDummy["id"] = sub["sub_id"]

                        dummyTask["subtasks"].append(subtaskDummy)

                    dummyTask["taskName"] = t["name"]
                    dummyTask["start"] = str(t["start"])
                    dummyTask["end"] = str(t["end"])
                    dummyTask["finished"] = t["finished"]
                    dummyTask["t_id"] = t["task_id"]

                    dummy["tasks"].append(dummyTask)

            print(tasks)
            response.append(dummy)
        return response

    def deleteAllTasks(self):
        if self.testing:
            Task.objects().delete()
            TaskList.objects().delete()
            return 'All tasks dropped!'
        else:
            return 'You do not have the permission to do that.'
