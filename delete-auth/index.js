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
  console.log('users to be removed ', listUsersResult.users.length)

  admin.auth().deleteUsers(listUsersResult.users.map(u => u.uid))
    .then(function(deleteUsersResult) {
      console.log('Successfully deleted ' + deleteUsersResult.successCount + ' users')
      console.log('Failed to delete ' +  deleteUsersResult.failureCount + ' users')
      deleteUsersResult.errors.forEach(function(err) {
        console.log(err.error.toJSON());
      })
    })
    .catch(function(error) {
      console.log('Error deleting users:', error)
    })

  console.log('Done')
  process.exit(0)
  return true
}
