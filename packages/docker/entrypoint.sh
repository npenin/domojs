#!/bin/sh

# Set correct ownership (if not already)
chown -R node:node .

udevd &
udevadm trigger

[ ! -f "db/.akala.json" ] && cp default-akala.json db/.akala.json

# Run the application as node
exec su node -s /bin/sh -c "$*"