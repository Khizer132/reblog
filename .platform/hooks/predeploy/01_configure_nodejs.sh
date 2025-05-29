#!/bin/bash
set -e

# Print current directory and its contents
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Install Node.js dependencies
echo "Installing dependencies..."
# Add more verbose output for npm install
npm install --verbose 2>&1 | tee npm_install.log

# Build the React application
echo "Building React application..."
npm run build 2>&1 | tee npm_build.log

# Ensure the Procfile is in the correct location
echo "Creating Procfile..."
echo "web: node src/backend/server.js" > Procfile

# Print the contents of the Procfile
echo "Procfile contents:"
cat Procfile

# Print the contents of package.json
echo "package.json contents:"
cat package.json

# Print the contents of npm_install.log
echo "npm install log:"
cat npm_install.log

# Print the contents of npm_build.log
echo "npm build log:"
cat npm_build.log 