from ..db.settings import db
import json

class User(db.Document):
    u_id = db.StringField(primary_key=True, required=True)
    name = db.StringField()
    img = db.StringField(default="https://i1.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1920%2C1920&ssl=1")
    last_login = db.StringField()

    def print(self):
        return "Id: %s, last_login: %s" % (self.u_id, self.last_login)

    def as_json(self):
        return self.to_json()
