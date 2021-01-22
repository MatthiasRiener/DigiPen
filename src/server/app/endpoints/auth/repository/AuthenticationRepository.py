from ....models.User import User

class AuthenticationRepository():
    def createUser(self, user_id):
        try:
             User(u_id=user_id, last_login="HIHI").save() 
        except Exception as e:
            return "Error while inserting user: %s" % (e)
        return "User succesfully inserted."   

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
