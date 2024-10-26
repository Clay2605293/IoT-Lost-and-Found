#!/bin/bash
node ./whatsapp-api/chat_bot.js &
node ./server/server.js &
cd ./client && npm start &
sleep 5
echo "Still running services..."
jobs
wait
