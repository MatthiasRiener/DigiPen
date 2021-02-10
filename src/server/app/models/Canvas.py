from ..db.settings import db

class Canvas(db.Document):
    p_id = db.StringField(required=True)