from ..db.settings import mongoclient
from ..repository.AuthenticationRepository import AuthenticationRepository

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