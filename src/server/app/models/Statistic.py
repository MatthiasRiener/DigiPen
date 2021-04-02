from ..db.settings import db

class Statistic(db.Document):
    name = db.StringField(required=True)
    date = db.IntField()