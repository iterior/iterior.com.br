var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var settings = require('./app/settings');

var app = express();

var router = require(settings.ROUTES_ROOT || './app/routes');

// set views path
app.set('views', (settings.VIEWS_PATH || './app/views'));
// Set ejs view engine
app.set('view engine', 'ejs');

// make a static files
app.use(express.static(path.join(__dirname, '/public')));

// set parse body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // to enconded bodies

app.use(router);

// process.env.PORT lets the port be set by Heroku
var port = (process.env.PORT || 8080);

app.listen(port, function () {
  console.log('Listening on : http://0.0.0.0:' + port);
});
