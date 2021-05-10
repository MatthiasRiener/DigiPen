from gevent import monkey
monkey.patch_all()
from eventlet import hubs
#hubs.use_hub("poll")

from config import app, socketio




if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, use_reloader=False)
