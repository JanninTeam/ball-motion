#!/bin/bash

# Prompt user
read -p "Enter your system ip address: " ip

read -p "Enter your system port (press enter to default to 5000)" port
port=${port:-5000}

# Create the .env file
echo "EXPO_PUBLIC_SERVER_URL=http://$ip:$port" > .env

echo "Created .env file with EXPO_PUBLIC_SERVER_URL=http://$ip:$port"
