const unsuspendUserHandler = require('../controllers/unsuspendUserHandler');
const validatePayloadEmail = require('../schemes/validatePayloadEmail');
const Joi = require('joi');

module.exports = [
  {
    method: 'PUT',
    path: '/unsuspendUser',
    handler: (request, reply) => {
      console.log('inside unsuspenduser handler');
      const promise = unsuspendUserHandler(request.headers.authorization, request.payload);
      promise.then((msg) => {
        reply(msg);
      });
    },
    config: {
      tags: ['api'],
      auth: 'jwt',
      validate: {
        payload: validatePayloadEmail,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },
  },

];
