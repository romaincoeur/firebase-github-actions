#!/bin/sh -l

if [ -z "$FIREBASE_TOKEN" ]; then
  echo "FIREBASE_TOKEN is required to run commands with the firebase cli"
  exit 126
fi

firebase use --add "$1"
firebase auth:export users.json
firebase use --add "$2"
firebase auth:import users.json --hash-algo=SCRYPT --rounds=8 --mem-cost=14 --hash-key="$BASE64_SIGNER_KEY" --salt-separator="$BASE64_SALT_SEPARATOR"
rm users.json
