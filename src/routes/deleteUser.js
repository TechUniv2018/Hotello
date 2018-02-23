const deleteUserHandler = require('../controllers/deleteUserHandler');

module.exports = [
  {
    method: 'DELETE',
    path: '/deleteUser',
    handler: (request, reply) => {
      console.log('inside deleteUser handler');
      const promise = deleteUserHandler(request.headers.authorization, request.payload);
      promise.then((msg) => {
        reply(msg);
      });
    },
    config: {
      tags: ['api'],
      auth: 'jwt',
    },
  },

];
