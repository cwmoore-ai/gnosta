#!/bin/bash

# Redis migration script for Gnosta project memory

# Configuration
JSON_FILE="memory/gnosta-project-memory.json"
REDIS_CONTAINER="redis-local"
REDIS_PORT=6379
KEY_PREFIX="gnosta:memory"

# Check if Redis is running
if ! docker inspect --format='{{.State.Running}}' $REDIS_CONTAINER 2>/dev/null | grep -q 'true'; then
    echo "Starting Redis container..."
    docker run -d --name $REDIS_CONTAINER -p $REDIS_PORT:6379 redis:latest
fi

# Verify Redis connection
if ! redis-cli -h localhost -p $REDIS_PORT PING 2>/dev/null | grep -q 'PONG'; then
    echo "Error: Could not connect to Redis server"
    exit 1
fi

# Create Redis commands from JSON
echo "Converting JSON to Redis commands..."
cat $JSON_FILE | jq -r --arg prefix "$KEY_PREFIX" '
def redis_set($key):
  "SET $$key) \"\($$key)\"\n";
  
def walk:
  if type == "object" then
    to_entries | map(
      .key as $k |
      if .value | type == "object" or type == "array" then
        walk
      else
        "SET $$k) \"\(.value)\"\n"
      end
    ) | join("")
  elif type == "array" then
    .[] | walk
  else
    empty
  end;
  
walk' > redis-commands.txt

# Import data to Redis
echo "Importing data to Redis..."
cat redis-commands.txt | redis-cli -h localhost -p $REDIS_PORT --pipe

# Verify import
echo "Verifying Redis import..."
redis-cli -h localhost -p $REDIS_PORT GET "$KEY_PREFIX:project_name"

# Cleanup
echo "Cleaning up redundant files..."
rm -f $JSON_FILE
rm -f redis-commands.txt

echo "Migration completed successfully!"