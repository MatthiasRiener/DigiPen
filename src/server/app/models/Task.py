from ..db.settings import db

class Task(db.Document):
    p_id = db.StringField(required=True)
    task_id = db.StringField(primary_key=True, required=True)
    name = db.StringField(default="No name defined")
    start = db.DateTimeField()
    end = db.DateTimeField()
    finished = db.BooleanField(default=False)
    subtasks = db.ListField(default=None)
    creator = db.StringField(required=True)
    assignee = db.StringField(required=True)
    created = db.IntField(required=True)