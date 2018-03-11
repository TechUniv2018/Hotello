const suspendUserHandler = require('../controllers/suspendUserHandler');

module.exports = [
  {
    method: 'PUT',
    path: '/suspendUser',
    handler: (request, reply) => {
      console.log('inside suspenduser handler');
      const promise = suspendUserHandler(request.headers.authorization, request.payload);
      promise.then((msg) => {
        reply(msg);
      });
    },
    config: {
      auth: 'jwt',
    },
  },

];
