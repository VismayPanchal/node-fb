const admin = require('firebase-admin')

const serviceAccount = require('../node-fb-b8462-firebase-adminsdk-fbsvc-715abf5ba8.json');

// // Initialize Firebase (replace with your project's configuration)
// const firebaseConfig = {
//     apiKey: config.webapikey,
//     databaseURL: config.databaseURL,
//     authDomain: config.authDomain,
//     projectId: config.projectId,
//     storageBucket: config.storageBucket,
//     messagingSenderId: config.messagingSenderid,
//     appId: config.appid
// };

// firebase.initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'node-fb-b8462', // Replace with your Project ID
});

module.exports = admin;
