const Models = require('../../models');
const JWT = require('jsonwebtoken');

module.exports = {
  validateAndSign: (request, reply) => {
    console.log('INSIDE HANDLER');
    Models.users.find({ where: { username: request.payload.username } }).then((user) => {
      // console.log('User datavalues are: ', user.dataValues);
      if (user) {
        if (user.dataValues.password === request.payload.password) {
          reply(JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            name: request.payload.username,
          }, 'NeverShareYourSecret'));
        } else {
          reply('Wrong password');
        }
      } else {
        reply('Wrong username');
      }
    });
  },
};
