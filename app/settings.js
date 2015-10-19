var path = require('path');
var env = require('../env');
var mongoose = require('mongoose');
var mandrill = require('mandrill-api/mandrill');

SECRET_KEY = 'y0g7#ucnls-vz)x%oybdjw#9m006w!i&hjt#fm=+zkf)&&ceg@';

VIEWS_PATH = path.join(__dirname, 'views');

ROUTES_ROOT = path.join(__dirname, '/routes');

exports.db = mongoose.connect(process.env.MONGOLAB_HOST || env.MONGOLAB_HOST);

exports.mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY || env.MANDRILL_API_KEY);
