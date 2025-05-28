#!/bin/bash

cd /home/aweitz/Desktop/DisplayProj/RaspberryPi-display || exit 1

#ngrok http http://localhost:5000 > /dev/null &
#NGROK_PID=$!

/usr/bin/sleep 5

#retrieves random public url
#NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

#echo "{\"url\": \"$NGROK_URL\"}" > /home/aweitz/Desktop/DisplayProj/RaspberryPi-display/ngrok_url.json

#echo "Ngrok public url: $NGROK_URL"

source venv/bin/activate
# starts Flask app
python3 app/server.py
