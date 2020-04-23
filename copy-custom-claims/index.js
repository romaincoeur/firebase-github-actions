var admin = require("firebase-admin")

var from = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.DECODED_SERVICE_ACCOUNT_FROM)),
}, 'from')

var to = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.DECODED_SERVICE_ACCOUNT_TO)),
}, 'to')

const migrateAllUsers = async (nextPageToken, count=0) => {
  const listUsersResult = await from.auth().listUsers(1000, nextPageToken)
  for (const userRecord of listUsersResult.users) {
    try {
      await to.auth().setCustomUserClaims(userRecord.uid, userRecord.customClaims)
      process.stdout.write(`${count++}\r`)
    }
    catch(error) {
      if (userRecord.customClaims) // Ignore error for Anonymous users without custom claims
        throw new Error('Error writing custom claims for user: ' + userRecord.uid + ' - Error: ' + error.toString())
    }
  }
  if (listUsersResult.pageToken) {
    await migrateAllUsers(listUsersResult.pageToken, count)
  }
  else process.exit(0)
}

// node -e 'require("./index").migrateCustomClaims()'
module.exports.migrateCustomClaims = migrateAllUsers
