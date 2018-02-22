const suspendUserHandler = require('../controllers/suspendUserHandler');
const validatePayloadEmail = require('../schemes/validatePayloadEmail');

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
      tags: ['api'],
      auth: 'jwt',
      validate: {
        payload: validatePayloadEmail,
      },
    },
  },

];
