var admin = require("firebase-admin")

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
})

// node -e 'require("./index").lockFirestore()'
const lockFirestore = async function() {
  try {
    const source = `service cloud.firestore {
      match /{document=**} {
        allow read: if true
        allow write: if false
      }
    }`

    await admin.securityRules().releaseFirestoreRulesetFromSource(source);
    process.exit(0)
  }
  catch(error) {
    console.log('Error while trying to lock database:', error)
    process.exit(1)
  }
}
module.exports.lockFirestore = lockFirestore
