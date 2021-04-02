from ..db.settings import mongoclient
from ..repository.AuthenticationRepository import AuthenticationRepository
from ..models.Statistic import Statistic

authRepo = AuthenticationRepository(testing=False)

import json
import os
from bson import json_util

from bson.objectid import ObjectId


class AdminPanelRepository():
    def __init__(self, testing):
        self.testing = testing
    def getUserCount(self, start, end):
        uCount = authRepo.getUserCount()
        nCount = authRepo.getNewUsersInRange(start, end)
        return json.dumps({"total_users": uCount, "new_users": nCount})
    def getInteractions(self, start, end):
        iCount = Statistic.objects(name="interaction").count()
        raw_query = {'date': {'$gte': start, '$lt': end}, "name": "interaction"}
        nCount = Statistic.objects(__raw__=raw_query).count()
        return json.dumps({"total_interactions": iCount, "new_interactions": nCount})


    