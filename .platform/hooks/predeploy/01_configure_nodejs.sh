#!/bin/bash
set -e

# Install Node.js dependencies
cd /var/app/staging
npm install

# Ensure the Procfile is in the correct location
if [ ! -f Procfile ]; then
    echo "web: node src/backend/server.js" > Procfile
fi 