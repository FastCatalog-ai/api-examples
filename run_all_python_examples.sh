#!/bin/bash

# Load environment variables from secrets/keys.env
set -a
source secrets/keys.env
set +a


set -e

cd examples

for dir in [1-5]_*/; do
  pyfile=$(find "$dir" -maxdepth 1 -name '*.py')
  if [ -n "$pyfile" ]; then
    echo "Running $pyfile"
    python3 "$pyfile"
  fi
done
