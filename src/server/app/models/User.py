from ..db.settings import db
import json

class User(db.Document):
    u_id = db.StringField(primary_key=True, required=True)
    name = db.StringField()
    mail = db.StringField(required=True)
    img = db.StringField(default="https://i1.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1920%2C1920&ssl=1")
    description = db.StringField(default="Hey there! I am using Slidea!")
    last_login = db.IntField()
    created = db.IntField()
    isAdmin = db.BooleanField(default=False)

    def print(self):
        return "Id: %s, last_login: %s" % (self.u_id, self.last_login)

    def as_json(self):
        return self.to_json()
