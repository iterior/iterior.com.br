var express = require('express');
var path = require('path');
var app = express();

var settings = require('./app/settings');
var router = require(settings.ROUTES_ROOT || './app/routes');


// process.env.PORT lets the port be set by Heroku
var port = (process.env.PORT || 8080);

console.log(settings.VIEWS_PATH);

// set views path
app.set('views', (settings.VIEWS_PATH || './app/views'));
// Set ejs view engine
app.set('view engine', 'ejs');

// make a static files
app.use(express.static(__dirname + '/public'));

app.use(router);

app.listen(port, function () {
  console.log('Listening on : http://0.0.0.0:' + port);
});
