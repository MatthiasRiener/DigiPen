from ..db.settings import db

class SubTask(db.Document):
    sub_id = db.StringField(primary_key=True, required=True)
    parent_id = db.StringField(required=True)
    name= db.StringField(required=True)
    status = db.BooleanField(default=False)