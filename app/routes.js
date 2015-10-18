var router = require('express').Router();

var home = require('./controllers/home');
var subscribe = require('./controllers/subscribes');

router.get('/', home.index);
router.post('/subscribes', subscribe.create);
router.get('/subscribes/:email', subscribe.edit);
router.post('/subscribes/:email', subscribe.update);

module.exports = router;
