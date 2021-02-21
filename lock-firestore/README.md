# Firebase Github Actions - Lock Firestore

This action set new rules to Firestore to lock every writes to database

## Environment variables

* `PROJECT_ID` - **Required** The id of the Firebase project
* `CLIENT_EMAIL` - **Required** From Service account json file
* `GCP_SA_KEY` - **Required** From Service account json file (private_key field) and base64 encoded

```bash
echo "<private_key>" | base64
```

## Example usage

```yaml
lock-firestore:
    name: Lock database
    runs-on: ubuntu-latest

    steps:
      - name: Checkout the repository
        uses: actions/checkout@v2
      - name: Lock Database Writes
        uses: romaincoeur/firebase-github-actions/lock-firestore@master
        env:
          PROJECT_ID: project-id
          CLIENT_EMAIL: client-email
          GCP_SA_KEY: ${{ secrets.GCP_SA_KEY }}
```
