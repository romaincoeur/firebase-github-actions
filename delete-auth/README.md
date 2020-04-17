# Firebase Github Actions - Delete Auth

This action removes every users from Firebase Authentication

## Environment variables

* `PROJECT_ID` - **Required** The id of the Firebase project
* `CLIENT_EMAIL` - **Required** From Service account json file
* `GCP_SA_KEY` - **Required** From Service account json file and base64 encoded

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
