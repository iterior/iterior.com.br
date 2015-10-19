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
    var send_mail = require('../mailers/mandrill');
    var email = req.params['email'];
    var query = {};
    if (email) {
      query.email = email;
    }
    Subscribe.find(query, function (err, subscribes) {
      subscribes.forEach(function (err, subscribe) {
        if (!subscribe.hasOwnProperty('confirmed_at')) {
          var body = [
            '<html>',
            '<head>',
            '<meta charset="utf-8">',
            '<title>iTerior Conferece</title>',
            '</head>',
            '<body>',
            'Olá ' + this.name + ', obrigado por se inscrever.',
            '<p>',
            'Com vagas limitadas nós realmente estamos contando com a sua presença.',
            'Caso haja algum imprevisto, por favor <a href="mailto:contato@iterior.com.br">deixe-nos saber</a>.',
            '</p>',
            '<p>Mudamos alguns campos de inscrição, por favor atualize <a href="http://iterior.com.br/subscribes/' + this.email + '" target="_blank">seu dados aqui</a>.</p>',
            '<br>',
            '--',
            '<p>Equipe iTerior</p>',
            '</body>',
            '</html>'
          ];
          send_mail({ name: subscribe.name, email: subscribe.email }, 'Inscrição Confirmada', body.join(''));
          subscribe.sended_at = new Date().toISOString();
          subscribe.save();
        }
      });
    });
  }
};

module.exports = SubscribesController;
