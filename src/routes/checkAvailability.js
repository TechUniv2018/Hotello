const checkAvailabilityValidation = require('../schemes/checkAvailabilityValidation');
const checkAvailabilityHandler = require('../controllers/checkAvailabilityHandler');

module.exports = [
  {
    method: 'GET',
    path: '/checkAvailability',
    handler: (request, reply) => {
      const result = checkAvailabilityHandler(request.payload);
      result.then((resultValue) => {
        if (resultValue === 'Error') {
          reply('Error').code(500);
        }
      });
    },
    config: {
      validate: {
        payload: checkAvailabilityValidation,
      },
      auth: 'jwt',
    },
  },
];
