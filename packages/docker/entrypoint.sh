#!/bin/sh

echo "Domojs starting..."

# Ensure db directory exists
mkdir -p db

# Copy default config if it doesn't exist
[ ! -f "db/.akala.json" ] && cp .akala.json db/.akala.json

echo "Ensuring proper ownership..."

# Set correct ownership (if not already)
chown -R node:node .

# Check if we're in development mode
if [ "$NODE_ENV" = "development" ]; then
    echo "Running in development mode..."

    # In development mode, we might want to run additional setup
    if [ -f "packages/docker/dev-setup.sh" ]; then
        echo "Running development setup..."
        . packages/docker/dev-setup.sh
    fi
else
    echo "Running in production mode..."

    udevd --daemon
    udevadm control --reload
    udevadm trigger

fi

. ./env-init.sh
# Read the generated password and set environment variables

# Run the application as node
exec su node -s /bin/sh -c "$*"