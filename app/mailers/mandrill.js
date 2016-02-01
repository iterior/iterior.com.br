const mandrill_client = require('../settings').mandrill_client;

const mandrillClient = (to, subject, body) => {
  const message = {
    'html': body,
    'subject': subject,
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
  mandrill_client.messages.send({'message': message}, (response) => {
    console.log(response);
  }, (e) => {
    console.log('A Mandrill error occurred: ', e.name, ' - ', e.message);
  });
};

module.exports = mandrillClient;
