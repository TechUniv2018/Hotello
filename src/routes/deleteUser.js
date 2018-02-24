const deleteUserHandler = require('../controllers/deleteUserHandler');
const validatePayloadEmail = require('../schemes/validatePayloadEmail');
const Joi = require('joi');

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
      validate: {
        payload: validatePayloadEmail,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },
  },

];
