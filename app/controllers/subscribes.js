var Subscribe = require('../models/subscribe');
var Subscribe = require('../models/subscribe');


var SubscribesController = {
  create: function (req, res) {
    var data = req.body;
    var subscribe = new Subscribe({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      created_at: new Date().toISOString()
    }).save(function (err, object) {
      if (err) res.json(err.toJSON());

      if (object) {
        object.send_confirmation();
        object.sended_at = new Date().toISOString();
        object.save();
        res.json(object.toJSON());
      };
    });
  },
  edit: function (req, res) {
    var email = req.params['email'];
    Subscribe.findOne({email: email}, function (err, subscribe) {
      if (err) {
        res.render('subscribes/form_success', { status: 'Cadastro não encontrado.' });
      }
      if (subscribe.hasOwnProperty('confirmed_at')) {
        res.render('subscribes/form_success', { status: 'Cadastro já confirmado.' });
      } else {
        res.render('subscribes/form', {subscribe: subscribe});
      }
    });
  },
  update: function (req, res) {
    var email = req.params['email'];
    var company = req.body.company;
    var template_name = 'subscribes/form_success';

    Subscribe.findOne({email: email}, function (err, subscribe) {
      if (err) {
        res.render(template_name, {
          status: 'Cadastro não encontrado.'
        });
      }

      if (company) {
        subscribe.company = company;
        subscribe.confirmed_at = new Date().toISOString();
      }

      subscribe.save(function (err, data) {
        res.render(template_name, {
          status: 'Cadastro atualizado com sucesso!', subscribe: data
        });
      });
    });
  },
  send: function (req, res) {
    var email = req.params['email'];
    var query = {};
    if (email) {
      query.email = email;
    }
    Subscribe.find(query, function (err, subscribes) {
      subscribes.forEach(function (err, subscribe) {
        var s = new Subscribe({
          name: subscribe.name,
          email: subscribe.email,
          phone: subscribe.phone,
          address: subscribe.address
        });
        s.send_confirmation();
        s.sended_at = new Date().toISOString();
        s.save();
      });
    });
  }
};

module.exports = SubscribesController;
