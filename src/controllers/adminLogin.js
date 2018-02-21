const Models = require('../../models');
const JWT = require('jsonwebtoken');

module.exports = {
  validateAndSign: (request, reply) => {
    console.log('INSIDE HANDLER');
    Models.users.find({ where: { email: request.payload.email } }).then((user) => {
      if (user) {
        if (user.dataValues.password === request.payload.password) {
          reply(JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            email: request.payload.email,
          }, 'RandomSecretString'));
        } else {
          reply('Wrong password');
        }
      } else {
        reply('Wrong email');
      }
    });
  },
};
