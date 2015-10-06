var FirebaseRef = require('../settings').FirebaseRef;
var subscribeRef = FirebaseRef.child('persons');

var Subscribe = {
    name: String,
    email: String,
    phone: String,
    address: String,
    all: function () {
        return FirebaseRef.childe('persons.json');
    },
    get: function () {
        // Filter by email
    },
    save: function (data) {
        return subscribeRef.push(data);
    }
};

module.exports = Subscribe;
