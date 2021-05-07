import eventlet
eventlet.monkey_patch()
from eventlet import hubs
#hubs.use_hub("poll")

from config import app, socketio




if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int("5000"), debug=True)
    socketio.run(app)
