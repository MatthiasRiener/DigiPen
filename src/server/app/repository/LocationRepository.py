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

            print(el["location"]["country_code"])
        return response