const getRoomDetailsHandler = require('../controllers/getRoomDetailsHandler');
const getRoomDetailsValidation = require('../schemes/getRoomDetailsValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/getRoomDetails/{hotelId}/{roomId}',
    handler: (request, reply) => {
      const result = getRoomDetailsHandler(request.headers.authorization, request.params.hotelId, request.params.roomId);
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
        params: getRoomDetailsValidation,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },

  },
];
