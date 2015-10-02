var Subscribe = require('../models/subscribe');

var SubscribesController = {
    create: function (req, res) {
    	var person = req.body;
    	Subscribe.save(person);
    	res.send(person);
    }
};

module.exports = SubscribesController;
