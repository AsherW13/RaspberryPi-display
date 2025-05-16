import eventlet
eventlet.monkey_patch()
from flask import Flask, send_from_directory
from flask_socketio import SocketIO

app = Flask(__name__, static_folder="../docs")
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

@socketio.on('pixel_update')
def handle_pixel(data):
    print(f"Relaying pixel: {data}")
    socketio.emit('pixel_update', data, broadcast=True)