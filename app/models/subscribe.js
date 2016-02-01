const mongoose = require('../settings').db;
const send_mail = require('../mailers/mandrill');

const subscribeSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,
  company: String,
  created_at: Date,
  sended_at: Date,
  confirmed_at: Date
});

subscribeSchema.methods.send_confirmation = function () {
  const body = [
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<title>iTerior Conferece</title>',
    '</head>',
    '<body>',
    '   Olá ' + this.name + ', obrigado por se inscrever.',
    '   <p>',
    '       Com vagas limitadas nós realmente estamos contando com a sua presença.',
    '       Caso haja algum imprevisto, por favor <a href="mailto:contato@iterior.com.br">nos avise</a>.',
    '   </p>',
    '   <p>Mudamos alguns campos de inscrição, por favor atualize <a href="http://iterior.com.br/subscribes/' + this.email + '" target="_blank">seu dados aqui</a>.</p>',
    '   <br>',
    '   --',
    '   <p>Equipe iTerior</p>',
    '</body>',
    '</html>'
  ];
  return send_mail(this, 'Confirmação de Inscrição', body.join(''));
};

subscribeSchema.methods.send_confirmated = function () {
  const body = [
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<title>iTerior Conferece</title>',
    '</head>',
    '<body>',
    '   Obrigado por se inscrever.',
    '   <p>Inscrição confirmada com sucesso.</p>',
    '   <p>Até breve.</p>',
    '   <br>',
    '   --',
    '   <p>Equipe iTerior</p>',
    '</body>',
    '</html>'
  ];
  return send_mail(this, 'Inscrição Confirmada', body.join(''));
};

subscribeSchema.methods.send_feedback = function () {
  const body = [
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<title>iTerior Conferece</title>',
    '</head>',
    '<body>',
    '    <p><strong>Que tal um feedback?<strong></p>',
    '    <p>Queremos melhorar e sua avaliação é primordial. Abaixo você encontra um link para avaliar o evento e nos ajudar a ser melhores.</p>',
    '    <p>Mesmo que você não tenha comparecido pode nos ajudar oferencendo ideias para o próximo ;).</p>',
    '    <br>',
    '    <a href="http://iterior.com.br/feedback" target="_blank" title="Feedback iterior.com.br">Avaliar</a>',
    '    <br>',
    '    --',
    '    <p>Equipe iTerior</p>',
    '</body>',
    '</html>'
  ];
  return send_mail(this, 'Obrigado.', body.join(''));
};


module.exports = mongoose.model('subscribes', subscribeSchema);
