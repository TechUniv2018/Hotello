const checkAvailabilityValidation = require('../schemes/checkAvailabilityValidation');
const checkAvailabilityHandler = require('../controllers/checkAvailabilityHandler');

module.exports = [
  {
    method: 'POST',
    path: '/checkAvailability',
    handler: (request, reply) => {
      const result = checkAvailabilityHandler(request.payload);
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
      },
      auth: 'jwt',
    },
  },
];
