from ..db.settings import db
import json
import uuid

class Presentation(db.Document):
    p_id = db.StringField(primary_key=True,  required=True)
    name = db.StringField(required=True)
    creator= db.StringField(required=True)
    created = db.IntField()
    export = db.BooleanField(default=False)
    timeline = db.BooleanField(default=False)
    keywords = db.ListField(default=None)
    public = db.BooleanField(default=False)
    users = db.ListField(default=[])