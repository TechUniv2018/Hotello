const updateHandler = require('../controllers/adminUpdateDetails');
const adminUpdateDetailsValidation = require('../schemes/adminUpdateDetailsValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/adminUpdateDetails',
    handler: (request, reply) => {
      const userDetailsPromise = updateHandler(request.headers.authorization, request.payload);
      reply(userDetailsPromise);
    },
    config: {
      tags: ['api'],
      validate: {
        payload: adminUpdateDetailsValidation,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
      auth: 'jwt',
    },

  },
];
