#!/bin/bash

echo "Building and starting msProduct with Docker Compose..."

# Stop any existing containers
docker-compose down

# Build and start the services
docker-compose up --build

echo "frontend is running on http://localhost:80" 
echo "backend is running on http://localhost:8080" 