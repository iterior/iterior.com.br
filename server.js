const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const settings = require('./app/settings');

const app = express();

const router = require(settings.ROUTES_ROOT || './app/routes');

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
const port = (process.env.PORT || 8080);

app.listen(port, () => {
  console.log('Listening on : http://0.0.0.0:' + port);
});
