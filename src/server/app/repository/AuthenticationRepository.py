from ..models.User import User

class AuthenticationRepository():
    def createUser(self, user_id):
        try:
             User(u_id=user_id, last_login="HIHI").save() 
        except Exception as e:
            return "Error while inserting user: %s" % (e)
        return "User succesfully inserted."   

    def retrieveUser(self, user_id):
        try:
            # [0] is working in this case, because it should only return one user
            user = User.objects(u_id=user_id)[0]
            return user
        except Exception as e:
            return "Error occured while retrieving user: %s" % (e)

    def add(self, x, y):
        if x is None: return y
        if y is None: return x
        return x + y 

    def sub(self, x, y):
        if x is None: return -y
        if y is None: return x
        return x - y

    def remove_spaces(self, str):
        if str is None:
            return ''
        return str.replace(' ', '')    
