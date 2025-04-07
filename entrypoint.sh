#!/bin/bash
# entrypoint.sh
set -e

# Remove a potentially pre-existing server.pid for Rails
rm -f /app/tmp/pids/server.pid

# Wait for PostgreSQL
until pg_isready -h db -U postgres; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

# Create and migrate database
bundle exec rails db:create
bundle exec rails db:migrate

# Then exec the container's main process (what's set as CMD in the Dockerfile)
exec "$@"