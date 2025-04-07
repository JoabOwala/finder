#!/bin/bash
# build-docker.sh

set -e

# Stop and remove existing containers
echo "Cleaning up previous Docker containers..."
docker-compose down -v --remove-orphans

# Rebuild Docker images
echo "Building new Docker images..."
docker-compose build --no-cache

# Start containers in detached mode
echo "Starting containers..."
docker-compose up -d

# Wait for database to be ready
echo "Waiting for database to become responsive..."
sleep 10

# Run database migrations
echo "Running database migrations..."
docker-compose exec web rails db:create
docker-compose exec web rails db:migrate

# Show container status
echo "Current container status:"
docker-compose ps

# Display logs
echo "Tailing container logs (Ctrl+C to exit)..."
docker-compose logs -f