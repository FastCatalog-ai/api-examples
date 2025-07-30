#!/bin/bash

if [ ! -d "node_modules" ]; then
  echo "Installing JS dependencies..."
  npm install
fi

# Load environment variables from secrets/keys.env
# FASTCATALOG_TOKEN=YOUR_TOKEN
set -a
source secrets/keys.env
set +a


set -e

cd examples

for dir in [1-5]_*/; do
  jsfile=$(find "$dir" -maxdepth 1 -name '*.js')
  if [ -n "$jsfile" ]; then
    echo "Running $jsfile"
    node "$jsfile"
  fi
done
