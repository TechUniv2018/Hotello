const bookHotelHandler = require('../controllers/bookHotelHandler');
const bookHotelValidation = require('../schemes/bookHotelValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/bookHotel',
    handler: (request, reply) => {
      const result = bookHotelHandler(request.headers.authorization, request.payload);
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
        params: bookHotelValidation,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },

  },
];
