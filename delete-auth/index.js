var admin = require("firebase-admin")

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS.replace(/\\n/g, '\n'),
  }),
})

// node -e 'require("./index").clearAuth(<projectId>)'
module.exports.clearAuth = async function() {

  const listUsersResult = await admin.auth().listUsers(1000)
  console.log('user to be removed ', listUsersResult.users.length)

  for (const userRecord of listUsersResult.users) {
    await admin.auth().deleteUser(userRecord.uid)
  }

  console.log('Done')
  process.exit(0)
  return true
}
