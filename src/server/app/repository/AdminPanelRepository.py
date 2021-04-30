from ..db.settings import mongoclient
from ..repository.AuthenticationRepository import AuthenticationRepository
from ..repository.PresentationRepository import PresentationRepository
from ..models.Statistic import Statistic

authRepo = AuthenticationRepository(testing=False)
presRepo = PresentationRepository(testing=False)

import time
import datetime

import json
import os
from bson import json_util
import collections

from bson.objectid import ObjectId


class AdminPanelRepository():
    def __init__(self, testing):
        self.testing = testing
    def getUserCount(self, start, end):
        uCount = authRepo.getUserCountDashboard(end=end)
        nCount = authRepo.getNewUsersInRange(start, end)
        return json.dumps({"total_users": uCount, "new_users": nCount})

    def getInteractions(self, start, end):
        iCount = mongoclient.db["statistic"].find({"name": "interaction", "date": {"$lt": int(end)} }).count()
        nCount = mongoclient.db["statistic"].find({"name": "interaction", "date": {"$gt": int(start), "$lt": int(end)} }).count()
        return json.dumps({"total_interactions": iCount, "new_interactions": nCount})

    def getPresentationCount(self, start, end):
        pCount = presRepo.getTotalPresentations(end=end)
        pNCount = presRepo.getNewTotalPresentations(start, end)
        return json.dumps({"total_presentations": pCount, "new_presentations": pNCount})
    def getTodaysCreatedTasks(self):
        
        morning, evening = self.getTodaysRange()

        elements = mongoclient.db["task"].find({"created": {"$gt": int(morning), "$lt": int(evening)} })

        print(morning, evening)
        return elements.count()
    def getTodaysCreatedPresentations(self):
        
        morning, evening = self.getTodaysRange()

        elements = mongoclient.db["presentation"].find({"created": {"$gt": int(morning), "$lt": int(evening)} })

        print(morning, evening)
        return elements.count()

    def getTodaysCreatedSlides(self):
            
        morning, evening = self.getTodaysRange()

        elements = mongoclient.db["canvas"].find({"created": {"$gt": int(morning), "$lt": int(evening)} })

        print(morning, evening)
        return elements.count()
    def getTodaysRange(self):
        dt = time.strftime('%Y-%m-%d', time.localtime(time.time()))
        element = datetime.datetime.strptime(dt, '%Y-%m-%d')
        morning = time.mktime(element.timetuple())
        evening = morning + 60 * 60 * 24
        return morning, evening
    def getUserInteractions(self, start, end):
        response = dict()
        elements = mongoclient.db["statistic"].find({"name": "login", "date": {"$gt": int(start), "$lt": int(end)} })
        
        for el in elements:
            timeOfEntry = el["date"]
            dt = time.strftime('%Y-%m-%d', time.localtime(timeOfEntry))
            element = datetime.datetime.strptime(dt, '%Y-%m-%d')
            timestamp = time.mktime(element.timetuple())

            if (timestamp in response.keys()):
                response[timestamp] += 1
            else:
                response[timestamp] = 1
        
        return collections.OrderedDict(sorted(response.items()))

    def getActiveUsersOverTime(self, start, end):
        response = dict()
        elements = mongoclient.db["statistic"].find({"name": "login", "date": {"$gt": int(start), "$lt": int(end)} })
        
        for el in elements:
            timeOfEntry = el["date"]
            dt = time.strftime('%Y-%m-%d', time.localtime(timeOfEntry))
            element = datetime.datetime.strptime(dt, '%Y-%m-%d')
            timestamp = time.mktime(element.timetuple())

            if timestamp not in response:
                response[timestamp] = list()
                response[timestamp].append(el["user"])
            else:
                if el["user"] not in response[timestamp]:
                    response[timestamp].append(el["user"])       

        print(response)
        return response

    def getOnlineUsers(self, users):
        userResponse = list()

        for u in users.keys():
            userResponse.append(authRepo.retrieveUserWithOutTimeChange(user_id=u))
        print("Data was retrieved...")
        return userResponse