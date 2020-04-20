#!/bin/bash -l

if [ -z "$GCP_SA_KEY" ]; then
  echo "GCP_SA_KEY is required to run commands with the firebase cli"
  exit 126
fi

if [ -n "$GCP_SA_KEY" ]; then
  echo "Storing GCP_SA_KEY in /opt/gcp_key.json"
  echo "$GCP_SA_KEY" | base64 --decode > /opt/gcp_key.json
  echo "Exporting GOOGLE_APPLICATION_CREDENTIALS=/opt/gcp_key.json"
  cat /opt/gcp_key.json
  export GOOGLE_APPLICATION_CREDENTIALS=$(cat /opt/gcp_key.json)
fi

node -e 'require("/usr/bin/index.js").clearAuth()'
