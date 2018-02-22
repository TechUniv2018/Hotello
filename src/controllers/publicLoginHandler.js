const Models = require('../../models');
const JWT = require('jsonwebtoken');

module.exports = (request, reply) => {
  Models.users.findOne({ where: { email: request.payload.username } }).then((user) => {
    if (user !== null) {
      if (user.dataValues.password === request.payload.password) {
        const token = JWT.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          name: request.payload.username,
        }, 'RandomSecretString');
        return reply(token);
      }
      return reply('Invalid credentials');
    }
    return reply('User does not exist');
  });
};
