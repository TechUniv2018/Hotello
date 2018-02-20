const suspendUserHandler = require('../controllers/suspendUser');

module.exports = [
  {
    method: 'PUT',
    path: '/suspendUser',
    handler: (request, reply) => {
      console.log('inside suspenduser handler');
      suspendUserHandler(request.headers.authorization, request.payload);
      reply('working on it');
    },
    config: {
      auth: 'jwt',
    },
  },

];
