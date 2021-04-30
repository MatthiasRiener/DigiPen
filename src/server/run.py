import eventlet
eventlet.monkey_patch()

from config import app, socketio




if __name__ == '__main__':
    app.run()
    socketio.run(app)