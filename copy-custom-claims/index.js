var admin = require("firebase-admin")

var from = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.DECODED_SERVICE_ACCOUNT_FROM)),
}, 'from')

var to = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.DECODED_SERVICE_ACCOUNT_TO)),
}, 'to')

const migrateAllUsers = async (nextPageToken, count=0) => {
  const listUsersResult = await from.auth().listUsers(1000, nextPageToken)
  console.log(`Moving ${listUsersResult.users.length} users`)
  const retry = []
  for (const userRecord of listUsersResult.users) {
    try {
      await to.auth().setCustomUserClaims(userRecord.uid, userRecord.customClaims)
      count++
      !process.env.CI && process.stdout.write(`${count}\r`)
    }
    catch(error) {
      if (userRecord.customClaims) {// Ignore error for Anonymous users without custom claims
        console.error('Error writing custom claims for user: ' + userRecord.uid + ' - Error: ' + error.toString())
        retry.push(userRecord)
      }
    }
  }
  console.log(`Retry ${retry.length} users`)
  for (const userRecord of retry) {
    try {
      await to.auth().setCustomUserClaims(userRecord.uid, userRecord.customClaims)
      count++
      !process.env.CI && process.stdout.write(`${count}\r`)
    }
    catch(error) {
      if (userRecord.customClaims) {// Ignore error for Anonymous users without custom claims
        console.error('Error writing custom claims for user: ' + userRecord.uid + ' - Error: ' + error.toString())
        process.exit(1)
      }
    }
  }
  if (listUsersResult.pageToken) {
    await migrateAllUsers(listUsersResult.pageToken, count)
  }
  else process.exit(0)
}

// node -e 'require("./index").migrateCustomClaims()'
module.exports.migrateCustomClaims = migrateAllUsers
