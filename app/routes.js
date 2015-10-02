var router = require('express').Router();

var home = require('./controllers/home');
var subscribe = require('./controllers/subscribes');

router.get('/', home.index);
router.post('/subscribe', subscribe.create);

module.exports = router;
