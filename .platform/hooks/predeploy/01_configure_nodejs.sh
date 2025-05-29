#!/bin/bash
set -e

# Print current directory and its contents
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Install Node.js dependencies
echo "Installing dependencies..."
npm install

# Build the React application
echo "Building React application..."
npm run build

# Ensure the Procfile is in the correct location
echo "Creating Procfile..."
echo "web: node src/backend/server.js" > Procfile

# Print the contents of the Procfile
echo "Procfile contents:"
cat Procfile

# Print the contents of package.json
echo "package.json contents:"
cat package.json 