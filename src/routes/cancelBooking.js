const cancelBookingHandler = require('../controllers/cancelBookingHandler');
const cancelBookingValidation = require('../schemes/adminCancelBookingValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/cancelBooking/{pnr}',
    handler: (request, reply) => {
      const result = cancelBookingHandler(request.headers.authorization, request.headers.sessionId, request.params.pnr);
      result.then((resultValue) => {
        if (resultValue === 'Error') {
          reply('Error').code(500);
        } else {
        // console.log(resultValue.hotel.rooms);
          reply(resultValue);
        }
      });
    },
    config: {
      tags: ['api'],
      auth: 'jwt',
      validate: {
        params: cancelBookingValidation,
        headers: Joi.object({ authorization: Joi.string(), sessionId: Joi.string() }).unknown(true),
      },
    },

  },
];
