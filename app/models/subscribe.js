var FirebaseRef = require('../settings').FirebaseRef;
var subscribeRef = FirebaseRef.child('persons');

var Subscribe = {
    name: String,
    email: String,
    phone: String,
    address: String,
    all: function () {
        return subscribeRef;
    },
    get: function (email) {
        subscribeRef.on('value', function (data) {
            console.log(data);
        });
    },
    save: function (data) {
        return subscribeRef.child(data.email).push(data);
    }
};

module.exports = Subscribe;
