from ..db.settings import db
from .Task import Task
import json


class TaskList(db.Document):
    p_id = db.StringField(required=True, primary_key=True)
    t_color = db.StringField()
