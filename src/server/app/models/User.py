from ..db.settings import db
import json

class User(db.Document):
    u_id = db.StringField(primary_key=True, required=True)
    name = db.StringField()
    mail = db.StringField(required=True)
    img = db.StringField(default="/static/profile/img/unknown/slidea_no_profile.jpg")
    description = db.StringField()
    last_login = db.IntField()
    created = db.IntField()
    isAdmin = db.BooleanField(default=False)

    def print(self):
        return "Id: %s, last_login: %s" % (self.u_id, self.last_login)

    def as_json(self):
        return self.to_json()
