from ..db.settings import mongoclient
import json
import os
from bson import json_util

class KeybindingRepository():

    def __init__(self, testing):
        self.testing = testing

    def createKeybindings(self, u_id):
        keybindings = self.readJson()
        mongoclient.db['keybinding'].insert_one(
            {'u_id': u_id, 'bindings': keybindings})

    def getKeybindings(self, u_id):
        res = mongoclient.db['keybinding'].find_one({"u_id": u_id})
        return json.loads(json_util.dumps(res))
    def updateKeybinds(self, keybinds, u_id):
        mongoclient.db['keybinding'].update({"u_id": u_id},  { "$set": { "bindings": keybinds }})
        return 1
    def readJson(self):
        __location__ = os.path.realpath(
            os.path.join(os.getcwd(), os.path.dirname(__file__)))
        with open(os.path.join(__location__, 'shortcuts.json')) as json_file:
            data = json.load(json_file)

            res = list()

            for bind in data:
                res.append(bind)
        return res
