from ..db.settings import db

class User(db.Document):
    u_id = db.StringField(primary_key=True, required=True)
    last_login = db.StringField()

    def print(self):
        return "Id: %s, last_login: %s" % (self.u_id, self.last_login)

