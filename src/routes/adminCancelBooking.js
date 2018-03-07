const adminCancelBookingHandler = require('../controllers/adminCancelBookingHandler');
const adminCancelBookingValidation = require('../schemes/adminCancelBookingValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/adminCancelBooking/{pnr}',
    handler: (request, reply) => {
      const result = adminCancelBookingHandler(request.headers.authorization, request.params.pnr);
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
        params: adminCancelBookingValidation,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },

  },
];
