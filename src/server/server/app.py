from flask import Flask

# import all endpoints
from endpoints import QuotesView
from endpoints.login import LoginView

app = Flask(__name__)

QuotesView.register(app)
LoginView.register(app)

if __name__ == '__main__':
    app.run()