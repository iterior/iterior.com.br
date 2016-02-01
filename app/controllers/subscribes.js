const Subscribe = require('../models/subscribe');

const SubscribesController = {
  create: (req, res) => {
    const data = req.body;
    const subscribe = new Subscribe({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      created_at: new Date().toISOString()
    }).save((err, object) => {
      if (err) res.json(err.toJSON());

      if (object) {
        object.send_confirmation();
        object.sended_at = new Date().toISOString();
        object.save();
        res.json(object.toJSON());
      };
    });
  },
  edit: (req, res) => {
    const email = req.params['email'];
    Subscribe.findOne({email: email}, (err, subscribe) => {
      if (err) {
        res.render('subscribes/form_success', { status: 'Cadastro não encontrado.' });
      }
      if (subscribe.confirmed_at) {
        res.render('subscribes/form_success', { status: 'Cadastro já confirmado.' });
      } else {
        res.render('subscribes/form', {subscribe: subscribe});
      }
    });
  },
  update: (req, res) => {
    const email = req.params['email'];
    const company = req.body.company;
    const template_name = 'subscribes/form_success';

    Subscribe.findOne({email: email}, (err, subscribe) => {
      if (err) {
        res.render(template_name, {
          status: 'Cadastro não encontrado.'
        });
      }

      if (company) {
        subscribe.company = company;
        subscribe.confirmed_at = new Date().toISOString();
      }

      subscribe.save((err, data) => {
        subscribe.send_confirmated();
        res.render(template_name, {
          status: 'Cadastro atualizado com sucesso!', subscribe: data
        });
      });
    });
  },
  sendFeedback: (req, res) => {
    Subscribe.find({}, (err, subscribes) => {
      subscribes.forEach((subscribe) => {
        subscribe.send_feedback();
      });
    });
  }
};

module.exports = SubscribesController;
