from config import app, socketio


if __name__ == '__main__':
    app.run()
    socketio.run(app)