from ..db.settings import db
from .Task import Task
import json


class TaskList(db.Document):
    p_id = db.StringField(required=True)
    t_color = db.StringField(default="#ff0000")
