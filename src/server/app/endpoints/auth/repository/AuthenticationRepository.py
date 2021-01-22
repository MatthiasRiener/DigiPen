from ....models.User import User

class AuthenticationRepository():
    def createUser(self, user_id):
        try:
             User(u_id=user_id, last_login="NOW").save() 
        except Exception as e:
            return "Error while inserting user: %s" % (e)
        return "User succesfully inserted."    