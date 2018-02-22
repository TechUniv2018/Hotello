const logoutHandler = require('../controllers/adminLogout');

module.exports = [
  {
    method: 'POST',
    path: '/logout',
    handler: (request, reply) => {
      const signedToken = logoutHandler(request.headers.authorization);
      reply(signedToken);
    },
    config: {
      tags: ['api'],
      auth: 'jwt',
    },
  },

];
