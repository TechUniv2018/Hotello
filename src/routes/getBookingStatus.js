const getBookingStatusHandler = require('../controllers/getBookingStatusHandler');
const getBookingStatusValidation = require('../schemes/getBookingStatusValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/getBookingStatus/{pnr}',
    handler: (request, reply) => {
      const result = getBookingStatusHandler(request.headers.authorization, request.params.pnr);
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
        params: getBookingStatusValidation,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },

  },
];
