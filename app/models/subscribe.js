var mongoose = require('../settings').db;
var send_mail = require('../mailers/mandrill');

var subscribeShema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,
  company: String,
  created_at: Date,
  sended_at: Date,
  confirmed_at: Date
});

subscribeShema.methods.send_confirmation = function () {
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
  return send_mail(this, body.join(''));
};

subscribeShema.methods.send_confirmated = function () {
  var body = [
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<title>iTerior Conferece</title>',
    '</head>',
    '<body>',
    'Obrigado por se inscrever.',
    '<p>Inscrição confirmada com sucesso.</p>',
    '<p>Até breve.</p>',
    '<br>',
    '--',
    '<p>Equipe iTerior</p>',
    '</body>',
    '</html>'
  ];
  return send_mail(this, body.join(''));
};


module.exports = mongoose.model('subscribes', subscribeShema);
