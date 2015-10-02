var Firebase = require('firebase');
var db = new Firebase('https://iterior.firebaseio.com/');

var Subscribe = {
    name: '',
    email: '',
    phone: '',
    address: '',
    save: function (data) {
        return db.push(data);
    }
};

module.exports = Subscribe;
