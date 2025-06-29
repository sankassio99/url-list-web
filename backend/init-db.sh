#!/bin/bash

# Start the PostgreSQL container
echo "Starting PostgreSQL container..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 5

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate dev --name init

echo "Database initialization completed!"
