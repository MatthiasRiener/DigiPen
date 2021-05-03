import eventlet
eventlet.monkey_patch()
from eventlet import hubs
hubs.use_hub("poll")

from config import app, socketio




if __name__ == '__main__':
    app.run()
    socketio.run(app)