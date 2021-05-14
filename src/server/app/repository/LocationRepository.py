from ..models.Canvas import Canvas
from ..db.settings import mongoclient

import json
import time


class LocationRepository():
    def __init__(self, testing):
        self.testing = testing
    def createLocationEntry(self, user_id, location_data):
        mongoclient.db["location"].insert_one({"user": user_id, "location": location_data, "time": time.time()})
        return 1
    
    def getUsersLocation(self, user_id):
        return list(mongoclient.db["location"].find({"user": user_id}).sort("_id", -1).limit(1))

    def getUsersAndLocation(self, start, end):
        response = dict()
        elements = mongoclient.db["location"].find({"time": {"$gt": int(start), "$lt": int(end)} })

        for el in elements:
            if (el["location"]["country_code"] not in response):
                response[el["location"]["country_code"]] = list();
                response[el["location"]["country_code"]].append(el["user"])
            else:
                if (el["user"] not in response[el["location"]["country_code"]]):
                    response[el["location"]["country_code"]].append(el["user"])

        return response
    def getRequestsAndLocation(self, start, end):
        response = dict()
        elements = mongoclient.db["location"].find({"time": {"$gt": int(start), "$lt": int(end)} })

        for el in elements:
            if (el["location"]["country_code"] not in response):
                response[el["location"]["country_code"]] = list();
                response[el["location"]["country_code"]].append(el["user"])
            else:
                response[el["location"]["country_code"]].append(el["user"])

        return response
    def getUserCountWithLocation(self, start, end):
        response = dict()
        total_requestCount = 0
        elements = mongoclient.db["location"].find({"time": {"$gt": int(start), "$lt": int(end)} })

        for el in elements:
            if (el["location"]["country_code"] not in response):
                response[el["location"]["country_code"]] = dict();
                response[el["location"]["country_code"]]["flag"] = el["location"]["flag"]["png"]
                response[el["location"]["country_code"]]["name"] = el["location"]["country"]
                response[el["location"]["country_code"]]["last_login"] = el["time"]

                response[el["location"]["country_code"]]["users"] = list()
                response[el["location"]["country_code"]]["users"].append(el["user"])
                total_requestCount += 1
            else:
                if (el["user"] not in response[el["location"]["country_code"]]["users"]):
                    response[el["location"]["country_code"]]["users"].append(el["user"])
                    total_requestCount += 1
            
            if el["time"] >  response[el["location"]["country_code"]]["last_login"]:
                 response[el["location"]["country_code"]]["last_login"] = el["time"]

        return response, total_requestCount


    def getRequestsCountWithLocation(self, start, end):
        response = dict()
        total_requestCount = 0
        elements = mongoclient.db["location"].find({"time": {"$gt": int(start), "$lt": int(end)} })

        for el in elements:
            if (el["location"]["country_code"] not in response):
                response[el["location"]["country_code"]] = dict();
                response[el["location"]["country_code"]]["flag"] = el["location"]["flag"]["png"]
                response[el["location"]["country_code"]]["name"] = el["location"]["country"]
                response[el["location"]["country_code"]]["last_login"] = el["time"]

                response[el["location"]["country_code"]]["users"] = list()
                response[el["location"]["country_code"]]["users"].append(el["user"])
                total_requestCount += 1
            else:
                response[el["location"]["country_code"]]["users"].append(el["user"])
                total_requestCount += 1
            
            if el["time"] >  response[el["location"]["country_code"]]["last_login"]:
                 response[el["location"]["country_code"]]["last_login"] = el["time"]

        return response, total_requestCount