from ..db.settings import db

class Task(db.EmbeddedDocument):
    t_id = db.StringField(primary_key=True, required=True)
    name = db.StringField(default="No name defined")
    start = db.DateTimeField()
    end = db.DateTimeField()
    finished = db.BooleanField(default=False)
    subtasks = db.ListField()
    creator = db.StringField(required=True)