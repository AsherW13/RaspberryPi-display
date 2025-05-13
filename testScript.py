from sense_hat import SenseHat
import time
import random

sense = SenseHat()
sense.clear()

pixel_state = [[False for _ in range(8)] for _ in range (8)]

x = 0
y = 0
color = (160, 32, 240)
i = 0
try:
	while(i < 20):
		x = random.randint(0, 7)
		y = random.randint(0, 7)
		if not pixel_state[y][x]:
			color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
			pixel_state[y][x] = True
			sense.set_pixel(x,y, color)
			print(f"setting pixel ({x},{y})")
			time.sleep(3)
		else:
			print(f"pixel ({x},{y}) already set")
			continue
		i += 1
	sense.clear()
except KeyboardInterrupt:
	sense.clear()

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
