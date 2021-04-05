from ..db.settings import mongoclient
import json
import os
from bson import json_util
import time
from bson.objectid import ObjectId

from .AuthenticationRepository import AuthenticationRepository
aRepo = AuthenticationRepository(testing=False)


class IssueRepository():
    def __init__(self, testing):
        self.testing = testing

    def createIssue(self, data, user):
        mongoclient.db["issue"].insert_one(
            {'u_id': user, 'issue': data, "status": 0, 'submitted': time.time()})
        return 1

    def getIssue(self, i_id):
        el = mongoclient.db["issue"].find_one({"_id": ObjectId(i_id)})
        el["u_id"] = aRepo.retrieveUser(user_id=el["u_id"])
        return json.loads(json_util.dumps(el))

    def closeIssue(self, i_id):
        mongoclient.db['issue'].update_one({"_id": ObjectId(i_id)}, 
        {"$set": {"status": 1}})
        return json.dumps({"res": "issue-closed!"})

    def getIssues(self, start, end):
        response = list()
        elements = mongoclient.db["issue"].find({"status": 0, "submitted": {"$gt": int(start), "$lt": int(end)} })
        for el in elements:
            el["u_id"] = aRepo.retrieveUser(user_id=el["u_id"])
            response.append(json.loads(json_util.dumps(el)))
        return json.dumps({"res": response})
    