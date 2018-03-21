const Models = require('../../models');
const JWT = require('jsonwebtoken');
const constants = require('../constants.json');
const crypto = require('crypto');

module.exports = {
  validateAndSign: (request, reply) => {
    console.log('INSIDE HANDLER', request.payload.email);
    Models.users.find({ where: { email: request.payload.email } }).then((user) => {
      if (user) {
        const password = crypto.createHash('md5').update(request.payload.password).digest('hex');
        console.log('####', user.dataValues);
        if (user.dataValues.password === password && user.dataValues.role === 'admin') {
          console.log('here');
          reply(JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            email: request.payload.email,
          }, constants.JWT_SECRET));
        } else {
          reply('Wrong password');
        }
      } else {
        reply('Wrong email');
      }
    });
  },
};
