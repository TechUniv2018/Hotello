const bookHotelHandler = require('../controllers/bookHotelHandler');
const bookHotelValidation = require('../schemes/bookHotelValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/bookHotel',
    handler: (request, reply) => {
      const result = bookHotelHandler(request.headers.authorization, request.headers.sessionId, request.payload);
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
      // auth: false,
      tags: ['api'],
      auth: 'jwt',
      validate: {
        payload: bookHotelValidation,
        headers: Joi.object({ authorization: Joi.string(), sessionId: Joi.string() }).unknown(true),
      },
    },

  },
];
