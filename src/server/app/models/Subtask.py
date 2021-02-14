from ..db.settings import db

class SubTask(db.Document):
    parent_id = db.StringField(required=True)
    name= db.StringField(required=True)
    status = db.BooleanField(default=False)