const Models = require('../../models');
const JWT = require('jsonwebtoken');
const constants = require('../constants.json');
const crypto = require('crypto');

module.exports = (request, reply) => {
  Models.users.findOne({ where: { email: request.payload.username } }).then((user) => {
    if (user !== null) {
      const password = crypto.createHash('md5').update(request.payload.password).digest('hex');
      if (user.dataValues.password === password && user.dataValues.role === 'publicUser') {
        const token = JWT.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: request.payload.username,
        }, constants.JWT_SECRET);
        return reply(token);
      }
      return reply('Invalid credentials');
    }
    return reply('User does not exist');
  });
};
