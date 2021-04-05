from ..db.settings import mongoclient
import json
import os
from bson import json_util
import time
from bson.objectid import ObjectId

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from .AuthenticationRepository import AuthenticationRepository
aRepo = AuthenticationRepository(testing=False)

from ..endpoints.editor.controllers import twilio_account_sid

class IssueRepository():
    def __init__(self, testing):
        self.testing = testing

    def createIssue(self, data, user):
        mongoclient.db["issue"].insert_one(
            {'u_id': user, 'issue': data, "status": 0, 'submitted': time.time()})

        self.sendMailToAdmins()
        return 1

    def getIssue(self, i_id):
        el = mongoclient.db["issue"].find_one({"_id": ObjectId(i_id)})
        el["u_id"] = aRepo.retrieveUserWithOutTimeChange(user_id=el["u_id"])
        return json.loads(json_util.dumps(el))

    def closeIssue(self, i_id):
        mongoclient.db['issue'].update_one({"_id": ObjectId(i_id)}, 
        {"$set": {"status": 1}})
        return json.dumps({"res": "issue-closed!"})

    def getIssues(self, start, end):
        response = list()
        elements = mongoclient.db["issue"].find({"status": 0, "submitted": {"$gt": int(start), "$lt": int(end)} })
        for el in elements:
            el["u_id"] = aRepo.retrieveUserWithOutTimeChange(user_id=el["u_id"])
            response.append(json.loads(json_util.dumps(el)))
        return json.dumps({"res": response})

    def sendMailToAdmins(self):
        print(aRepo.retrieveAllAdmins())
        message = Mail(
        from_email='slidea.projects@gmail.com',
        to_emails=aRepo.retrieveAllAdmins(),
        subject='New Issue on Slidea.com!' ,
        html_content='Hello Lukas, someone reported a new issue.')
            
        sg = SendGridAPIClient("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")
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
            