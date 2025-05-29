
from flask import Flask, send_from_directory, send_file
from flask_socketio import SocketIO
from sense_hat import SenseHat

import time
import random
import os
import json
import threading

app = Flask(__name__, static_folder="../docs")
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

sense = SenseHat()
sense.clear()

set_pixels = {}

x = 0
y = 0
move_color = (255, 255, 255)
press_time = 0

# PI display functions
def set_pixel():
	for (lx, ly), color in set_pixels.items():
		sense.set_pixel(lx, ly, color)

def update_display(x, y, color):
	sense.clear()
	set_pixel()
	sense.set_pixel(x, y, color)

def move(event):
    global x, y, color, press_time
    if event.action == 'pressed':
        if event.direction == 'up' and y > 0:
            y -= 1
        elif event.direction == 'down' and y < 7:
            y += 1
        elif event.direction == 'left' and x > 0:
            x -= 1
        elif event.direction == 'right' and x < 7:
            x += 1
        elif event.direction == 'middle':
            now = time.time()
            if now - press_time < 0.3:
                if(x, y) in set_pixels:
                    del set_pixels[(x,y)]
                    update_display(x, y, move_color)
                    socketio.emit("pixel_update", {'x': x, 'y': y, 'color': [255, 255, 255]})
            else:
                temp_color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
                set_pixels[(x,y)] = temp_color
                update_display(x, y, move_color)
                socketio.emit("pixel_update", {'x': x, 'y': y, 'color': list(temp_color)}) 
            press_time = now
        else:
            print(f"cannot go out of bounds\n")
        update_display(x,y, move_color)

def create_Joystick():
    sense.stick.direction_up = move
    sense.stick.direction_down = move
    sense.stick.direction_left = move
    sense.stick.direction_right = move
    sense.stick.direction_middle = move

    update_display(x,y, move_color)

    try:
        while True:
            time.sleep(0.1)
    except KeyboardInterrupt:
        sense.clear()
# frontend web server routes 
def display_refresh():
    while True:
        sense.clear()
        set_pixel()
        sense.set_pixel(x, y, move_color)
        time.sleep(0.1)
@app.route('/')
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)
    
@app.route("/ngrok_url.json")
def ngrok_url():
    return send_file("ngrok_url.json")

@socketio.on('pixel_update')
def handle_pixel(data):
    x = data['x']
    y = data['y']
    color = tuple(data['color'])
    print(f"frontend pixel: ({x}, {y}) = {color}")
    if color == (255, 255, 255):
        if (x,y) in set_pixels:
            del set_pixels[(x, y)]
        set_pixel()
    else:
        set_pixels[(x, y)] = color
        sense.set_pixel(x, y, color)
        socketio.emit('pixel_update', data)

if __name__ == "__main__":
    threading.Thread(target=create_Joystick, daemon=True).start()
    threading.Thread(target=display_refresh, daemon=True).start()
    socketio.run(app, host="0.0.0.0", port=5000, allow_unsafe_werkzeug=True)
