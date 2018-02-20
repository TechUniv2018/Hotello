const suspendUserHandler = require('../controllers/suspendUser');

module.exports = [
  {
    method: 'PUT',
    path: '/suspendUser',
    handler: (request, reply) => {
      console.log('inside suspenduser handler');
      const promise = suspendUserHandler(request.headers.authorization, request.payload);
      promise.then(() => {
        reply('working on it');
      });
    },
    config: {
      auth: 'jwt',
    },
  },

];
