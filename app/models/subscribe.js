var Firebase = require('firebase');
var db = new Firebase('https://iterior.firebaseio.com/');

var Subscribe = {
    name: '',
    email: '',
    phone: '',
    address: '',
    save: function () {
        db.set(this);
    }
};

module.exports = Subscribe;
