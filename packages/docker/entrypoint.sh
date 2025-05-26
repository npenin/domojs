#!/bin/sh

# Set correct ownership (if not already)
chown -R node:node .

# Run the application as node
exec su node -s /bin/sh -c "$*"