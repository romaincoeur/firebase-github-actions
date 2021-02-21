#!/bin/bash -l

if [ -z "$PRIVATE_KEY" ]; then
  echo "PRIVATE_KEY is required to run command"
  exit 126
fi

node -e 'require("/usr/bin/index.js").lockFirestore()'
