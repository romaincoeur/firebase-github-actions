#!/bin/bash -l

if [ -z "$SERVICE_ACCOUNT_FROM" ]; then
  echo "Base64 enconded SERVICE_ACCOUNT_FROM is required to run command"
  exit 126
fi

if [ -z "$SERVICE_ACCOUNT_TO" ]; then
  echo "Base64 enconded SERVICE_ACCOUNT_TO is required to run command"
  exit 126
fi

if [ -n "$SERVICE_ACCOUNT_FROM"  ] && [ -n "$SERVICE_ACCOUNT_TO"  ]; then
  echo "Storing SERVICE_ACCOUNT_FROM in /opt/from_key.json"
  echo "$SERVICE_ACCOUNT_FROM" | base64 --decode > /opt/from_key.json
  echo "Exporting DECODED_SERVICE_ACCOUNT_FROM=/opt/from_key.json"
  export DECODED_SERVICE_ACCOUNT_FROM=$(cat /opt/from_key.json)

  echo "Storing SERVICE_ACCOUNT_TO in /opt/to_key.json"
  echo "$SERVICE_ACCOUNT_TO" | base64 --decode > /opt/to_key.json
  echo "Exporting DECODED_SERVICE_ACCOUNT_TO=/opt/to_key.json"
  export DECODED_SERVICE_ACCOUNT_TO=$(cat /opt/to_key.json)
fi

node -e 'require("/usr/bin/index.js").migrateCustomClaims()'
