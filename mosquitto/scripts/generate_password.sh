#!/bin/sh

# Generate a secure random password and configure MQTT
if [ -e "/scripts/password_generated " ]
then
    exit 0;
fi
# Create scripts directory if it doesn't exist
mkdir -p /scripts

# Generate a secure 24-character random password
# Using alphanumeric + special characters for strong security
PASSWORD=$(head /dev/urandom | tr -dc 'A-Za-z0-9!@#$%^&*()_+' | head -c 24)

# Store the password in a file that can be read by other containers
echo "$PASSWORD" > /scripts/mqtt_password.txt

# Set restrictive permissions on the password file
chmod 600 /scripts/mqtt_password.txt

# Create the MQTT password file with the admin user
# Format: username:password_hash
# We'll use the password in plaintext format that mosquitto_password can process
echo "admin:$PASSWORD" > /mosquitto/config/passwd

# Set proper permissions for the MQTT password file
chmod 600 /mosquitto/config/passwd

# Create a marker file to indicate completion
touch /scripts/password_generated

# Output the password to stdout (can be captured by logs if needed)
echo "Generated MQTT password: $PASSWORD"

# Keep the container running briefly to allow healthcheck to succeed
sleep 5
