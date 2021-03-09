from ..models.User import User
import re
import time
from .CustomException import CustomException
import uuid

class AuthenticationRepository():

    def __init__(self, testing):
        self.testing = testing

    def createUser(self, user_id, name, email, img, last_login, created):


        

        if email is None:
            return CustomException("Email must not be None").__str__()

        if type(email) is not str:
            return CustomException("Email must be a String").__str__()

        if created is None:
            return CustomException("The time when the user was created must not be None").__str__()

        if type(created) is not float:
            return CustomException("The time format of created is invalid. It has to be an integer").__str__()

        if created > time.time():
            return CustomException("Created must not be in the future").__str__()

        if last_login is None:
            return CustomException("Last login must not be None").__str__()
        
        if type(last_login) is not float:
            return CustomException("The time format of last login is invalid. It has to be an integer").__str__()


        if last_login > time.time():
            return CustomException("Last login must not be in the future").__str__()
            
        if last_login < created:
            return CustomException("Last login has to be equal/greater then created").__str__()

        if user_id is None:
            return CustomException("No information was given regarding the users userid").__str__()
        # test case username not None
        if name is None:
            return CustomException("No information was given regarding the users username").__str__()

        # test case only letters
        if name.isalpha() is False:
             return CustomException('The username can only contain alphabetical letters').__str__()

     
        if User.objects(u_id=user_id):
            return self.retrieveUser(user_id=user_id)
        else: 
            from .KeybindingRepository import KeybindingRepository
            keyRepo = KeybindingRepository(testing=False)

            user = User(u_id=str(user_id), name=name, mail=email, img=img, last_login=last_login, created=time.time()).save()
            keyRepo.createKeybindings(user_id)

            return self.retrieveUser(user_id=user_id)
        return "User %s was successfully inserted." % (user_id)

    def retrieveUser(self, user_id):

        
        if user_id is None:
            return CustomException("Invalid information was given regarding the users userid").__str__()

        try:
            uuid.UUID(str(user_id))
        except ValueError:
            return CustomException("Invalid information was given regarding the users userid").__str__()    
        
        if not User.objects(u_id=user_id):
            return CustomException("No user was retrieved with the userid %s" % (user_id)).__str__()
        
        try:
            User.objects(u_id=user_id).first().update(set__last_login=time.time())
            user = User.objects(u_id=user_id).first().to_mongo()
            return user
        except Exception as e:
            return "Error occured while retrieving user: %s" % (e)

    def retrieveUserByMail(self, user_mail):
        user = User.objects(mail=user_mail).first()        
        return user

    def retrieveUsersByMail(self, user_mail):
        regex = re.compile('.*' + user_mail + '.*')
        users = [ob.to_mongo() for ob in User.objects(mail=regex)]

        return users
        
    def getUserIds(self, users):
        userIds = []
        for user in users:
            rUser = self.retrieveUserByMail(user)
            if rUser is not None:
                userIds.append(rUser.u_id)
        return userIds

    def getUserCount(self):
        return User.objects().count()

    def getUsersForPresentation(self, pres):
        for index, user_obj in enumerate(pres.users):
            print(user_obj['u_id'])
            pres.users[index] = self.retrieveUser(user_obj['u_id'])

            pres.users[index]['status'] = user_obj['status']
            if pres.creator == user_obj['u_id']:
                pres.users[index]['role'] = 'Owner'
            else:
                pres.users[index]['role'] = 'Member'

        return pres
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
