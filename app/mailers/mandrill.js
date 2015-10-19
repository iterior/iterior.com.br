var mandrill_client = require('../settings').mandrill_client;

var mandrillClient = function (to, body) {
  var message = {
    'html': body,
    'subject': 'Inscrição confirmada',
    'from_email': 'noreply@iterior.com.br',
    'from_name': 'iTerior Conference',
    'to': [
    {
      'email': to.email,
      'name': to.name,
      'type': 'to'
    }
    ],
    'google_analytics_domain': [
      'iterior.com.br'
    ]
  }
  mandrill_client.messages.send({'message': message}, function(response) {
    console.log(response);
  }, function(e) {
    console.log('A Mandrill error occurred: ', e.name, ' - ', e.message);
  });
};

module.exports = mandrillClient;
