from sense_hat import SenseHat
import time
import random

sense = SenseHat()
sense.clear()


set_pixels = {}
#pixel_state = [[False for _ in range(8)] for _ in range (8)]

x = 0
y = 0
move_color = (255, 255, 255)
#i = 0
press_time = 0
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
			else:
				temp_color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
				set_pixels[(x,y)] = temp_color 
			press_time = now
		else:
			print(f"cannot go out of bounds\n")
		update_display(x,y, move_color)
	

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
	
	
	
#try:
#	while(i < 20):
#		x = random.randint(0, 7)
#		y = random.randint(0, 7)
#		if not pixel_state[y][x]:
#			color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
#			pixel_state[y][x] = True
#			sense.set_pixel(x,y, color)
#			print(f"setting pixel ({x},{y})")
#			time.sleep(3)
#		else:
#			print(f"pixel ({x},{y}) already set")
#			continue
#		i += 1
#	sense.clear()
#except KeyboardInterrupt:
#	sense.clear()

#try:
#	while True:
#			if event.action == 'pressed':
#				x = random.randint(0, 7)
#				y = random.randint(0, 7)
#				color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
#				sense.set_pixel(x,y, color)
#		time.sleep(0.1)
#except KeyboardInterrupt:
#	sense.clear()


#try:
#	while True:
#		for event in sense.stick.get_events():
#			if event.action == 'pressed':
#				direction = event.direction
#				sense.show_message(direction, scroll_speed=0.1, text_colour=[160, 32, 240])
#				sense.clear()
#		time.sleep(0.1)
#except KeyboardInterrupt:
#	sense.clear()
