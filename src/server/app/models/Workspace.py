from ..db.settings import db
import json
from .User import User

class Workspace(db.Document):
    w_id = db.StringField(primary_key=True, required=True)
    w_name = db.StringField(required=True)
    w_color = db.StringField()
    w_users = db.ListField()

