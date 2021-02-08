from ..db.settings import db
import json

class Presentation(db.Document):
    p_id = db.StringField(primary_key=True, required=True)
    name = db.StringField(required=True)
    canvas_id = db.StringField()
    created = db.IntField()