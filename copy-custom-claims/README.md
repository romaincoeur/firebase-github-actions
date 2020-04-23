# Firebase Github Actions - Copy Custom Claims

This action copies users custom claims from one Firebase project to another

## Environment variables

* `PROJECT_ID` - **Required** The id of the Firebase project
* `CLIENT_EMAIL` - **Required** From Service account json file
* `GCP_SA_KEY` - **Required** From Service account json file (private_key field) and base64 encoded

```bash
echo "<private_key>" | base64
```

## Example usage

```yaml
delete-auth:
    name: Remove Firebase users
    runs-on: ubuntu-latest

    steps:
      - name: Checkout the repository
        uses: actions/checkout@v2
      - name: Delete auth users
        uses: romaincoeur/firebase-github-actions/delete-auth@master
        env:
          PROJECT_ID: project-id
          CLIENT_EMAIL: client-email
          GCP_SA_KEY: ${{ secrets.GCP_SA_KEY }}
```
