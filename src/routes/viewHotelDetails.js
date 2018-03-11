const viewHotelDetailsHandler = require('../controllers/viewHotelDetailsHandler');
const viewHotelDetailsValidation = require('../schemes/viewHotelDetailsValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/viewHotelDetails/{hotelId}',
    handler: (request, reply) => {
      const result = viewHotelDetailsHandler(request.headers.authorization, request.headers.sessionId, request.params.hotelId);
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
        params: viewHotelDetailsValidation,
        headers: Joi.object({ authorization: Joi.string(), sessionId: Joi.string() }).unknown(true),
      },
    },

  },
];
