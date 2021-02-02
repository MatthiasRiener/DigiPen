from ..db.settings import db
import json

class Workspace(db.Document):
    w_name = db.StringField(required=True)

