from ..models.User import User
import re
import time

class AuthenticationRepository():

    def __init__(self, testing):
        self.testing = testing

    def createUser(self, user_id, name, email, img, last_login, created):


        if user_id is None:
            return "No information was given regarding the users userid"
        # test case username not None
        if name is None:
            return "No information was given regarding the users username"

        # test case only letters
        if name.isalpha() is False:
            return 'The username can only contain alphabetical letters'

     
        if User.objects(u_id=user_id):
            print("retrieving user....")
            return self.retrieveUser(user_id=user_id)
        else: 
            user = User(u_id=str(user_id), name=name, mail=email, img=img, last_login=last_login, created=time.time()).save()
            print("user created....", user)
            return self.retrieveUser(user_id=user_id)
        return "User %s was successfully inserted." % (user_id)

    def retrieveUser(self, user_id):

        
        if user_id is None:
            return "Invalid information was given regarding the users userid"

        if not User.objects(u_id=user_id):
            return "No user was retrieved with the userid %s" % (user_id)
        
        try:
            User.objects(u_id=user_id).first().update(set__last_login=time.time())
            user = User.objects(u_id=user_id).first().to_mongo()
            return user
        except Exception as e:
            return "Error occured while retrieving user: %s" % (e)

    def retrieveUserByMail(self, user_mail):
        user = User.objects(mail=user_mail).first()        
        return user

    def getUserIds(self, users):
        userIds = []
        for user in users:
            rUser = self.retrieveUserByMail(user)
            if rUser is not None:
                userIds.append(rUser.u_id)
        return userIds

    def getUserCount(self):
        return User.objects().count()

    def deleteAll(self):
        if self.testing:
            User.objects().delete()
            return 'All users deleted...'
        else:
            return "You don't have the permission for that."
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
