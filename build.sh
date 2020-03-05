#!/bin/bash 

# color codes for output formatting
GREEN="\033[0;32m"      
NO_COLOR="\033[0m"

CURR_DIR=$(pwd)
DOCKER_USER="daltourism"
DOCKER_PASS="Daltourism@123"

echo -e "${GREEN}Removing old client container...${NO_COLOR}"
docker rm -f client
echo -e "${GREEN}Removing old client images...${NO_COLOR}"
docker rmi -f daltourism/client

echo -e "${GREEN}Preparing files for building Client image...${NO_COLOR}"
# ng build
cp "$CURR_DIR/docker_files/client.dockerfile" "$CURR_DIR/dist"
cd "$CURR_DIR/dist"

echo -e "${GREEN}Building client image...${NO_COLOR}"
docker build -t daltourism/client:latest -f ./client.dockerfile .
cd ..
rm "$CURR_DIR/dist/client.dockerfile"

echo -e "${GREEN}Running the client container...${NO_COLOR}"
docker run -d --name client -p 7000:7000 daltourism/client

echo -e "${GREEN}Removing old server container...${NO_COLOR}"
docker rm -f server
echo -e "${GREEN}Removing old server images...${NO_COLOR}"
docker rmi -f daltourism/server

echo -e "${GREEN}Preparing files for building server image...${NO_COLOR}"
cd "$CURR_DIR"
cp "$CURR_DIR/docker_files/server.dockerfile" "$CURR_DIR/server/"
cd "$CURR_DIR/server"

echo -e "${GREEN}Building Server image...${NO_COLOR}"
docker build -t daltourism/server:latest -f ./server.dockerfile .
cd ..
rm "$CURR_DIR/server/server.dockerfile"

echo -e "${GREEN}Running the Server container...${NO_COLOR}"
docker run -d --name server -p 5000:5000 daltourism/server

echo -e "${GREEN}Logging to the Docker Hub...${NO_COLOR}"
docker login --username=$DOCKER_USER --password=$DOCKER_PASS

echo -e "${GREEN}Pushing the images to Docker Hub...${NO_COLOR}"
docker push daltourism/server
docker push daltourism/client