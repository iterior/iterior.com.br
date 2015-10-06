var path = require('path');
var Firebase = require('firebase');

SECRET_KEY = 'y0g7#ucnls-vz)x%oybdjw#9m006w!i&hjt#fm=+zkf)&&ceg@';

VIEWS_PATH = path.join(__dirname, 'views');

ROUTES_ROOT = path.join(__dirname, '/routes');

exports.FirebaseRef = new Firebase('https://iterior.firebaseio.com/');
