const checkAvailabilityValidation = require('../schemes/checkAvailabilityValidation');
const checkAvailabilityHandler = require('../controllers/checkAvailabilityHandler');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/checkAvailability',
    handler: (request, reply) => {
      const result = checkAvailabilityHandler(request.headers.sessionId, request.payload);
      console.log(result);
      result.then((resultValue) => {
        if (resultValue === 'Error') {
          reply('Error').code(500);
        } else {
          reply(resultValue);
        }
      });
    },
    config: {
      tags: ['api'],
      validate: {
        payload: checkAvailabilityValidation,
        headers: Joi.object({ sessionId: Joi.string() }).unknown(true),
      },
      auth: false,
    },
  },
];
