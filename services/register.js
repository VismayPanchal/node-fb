const admin = require('../middleware/auth')


module.exports = {
    register: function (req) {

        admin.auth().createUser(req)
            .then((userRecord) => {
                console.log('Successfully created new user:', userRecord.uid);
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
            });

    }
}