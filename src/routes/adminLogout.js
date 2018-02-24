const logoutHandler = require('../controllers/adminLogout');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/logout',
    handler: (request, reply) => {
      const signedToken = logoutHandler(request.headers.authorization);
      reply({
        msg: 'User Logged Out!',
        token: signedToken,
      });
    },
    config: {
      tags: ['api'],
      auth: 'jwt',
      validate: {
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },
  },

];
