var admin = require("firebase-admin")

console.log('projectId', process.env.PROJECT_ID)
console.log('clientEmail', process.env.CLIENT_EMAIL)
console.log('private_key', process.env.GOOGLE_APPLICATION_CREDENTIALS.replace(/\\n/g, '\n'))

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS.replace(/\\n/g, '\n'),
  }),
})

// node -e 'require("./index").clearAuth(<projectId>)'
const clearAuth = async function(nextPageToken) {
  const listUsersResult = await admin.auth().listUsers(1000, nextPageToken)
  console.log('users to be removed ', listUsersResult.users.length)
  try {
    const deleteUsersResult = await admin.auth().deleteUsers(listUsersResult.users.map(u => u.uid))
    console.log('Successfully deleted ' + deleteUsersResult.successCount + ' users')
    console.log('Failed to delete ' +  deleteUsersResult.failureCount + ' users')
    deleteUsersResult.errors.forEach(function(err) {
      console.log(err.error.toJSON())
    })
    if (listUsersResult.pageToken) await clearAuth(listUsersResult.pageToken)
    else process.exit(0)
  }
  catch(error) {
    console.log('Error deleting users:', error)
    process.exit(1)
  }
}
module.exports.clearAuth = clearAuth
