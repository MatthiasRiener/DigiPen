from ..db.settings import mongoclient
from ..repository.AuthenticationRepository import AuthenticationRepository
from ..repository.PresentationRepository import PresentationRepository
from ..models.Statistic import Statistic

authRepo = AuthenticationRepository(testing=False)
presRepo = PresentationRepository(testing=False)

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
        nCount = mongoclient.db["statistic"].find({"name": "interaction", "date": {"$gt": int(start), "$lt": int(end)} }).count()
        return json.dumps({"total_interactions": iCount, "new_interactions": nCount})
    def getPresentationCount(self, start, end):
        pCount = presRepo.getTotalPresentations()
        pNCount = presRepo.getNewTotalPresentations(start, end)
        return json.dumps({"total_presentations": pCount, "new_presentations": pNCount})

    