from flask import Flask
# import all endpoints
from endpoints.auth import auth
from endpoints.error_handler import ErrorHandler

errorHandler = ErrorHandler()
app = Flask(__name__)

app.register_blueprint(auth, url_prefix="/auth")


def initializeErrors():
    import json
    f = open('./error/error-codes.json')

    if f != None:
        data = json.load(f)
        for i in data:
            app.register_error_handler(i['code'], getattr(ErrorHandler, i['callback']))
    
    f.close()

if __name__ == '__main__':
    initializeErrors()
    app.run()


