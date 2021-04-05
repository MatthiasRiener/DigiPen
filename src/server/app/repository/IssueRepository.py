from ..db.settings import mongoclient
import json
import os
from bson import json_util
import time

class IssueRepository():
    def __init__(self, testing):
        self.testing = testing

    def createIssue(self, data, user):
        mongoclient.db["issue"].insert_one(
            {'u_id': user, 'issue': data, "status": 0, 'submitted': time.time()})
        return 1