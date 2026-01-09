#!/bin/sh

if [ -f /scripts/mqtt_password.txt ]; then
  MQTT_PASSWORD=$(cat /scripts/mqtt_password.txt)
  echo "Using generated MQTT password: ${MQTT_PASSWORD}"
  export MQTT_PASSWORD
  export PUBSUB_URL='mqtt://admin:'`node -e "console.log(encodeURIComponent('${MQTT_PASSWORD}'))"`'@mqtt/'
  echo "PUBSUB_URL set to: ${PUBSUB_URL}"
else
  echo "Warning: No MQTT password file found, using default"
  export PUBSUB_URL="mqtt://admin:123456@mqtt/"
fi
