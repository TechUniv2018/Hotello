const searchHotelsByCityValidation = require('../schemes/searchHotelsByCityValidation');
const searchHotelsByCityHandler = require('../controllers/searchHotelsByCityHandler');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/searchHotelsByCity/{cityName}',
    handler: (request, reply) => {
      const result = searchHotelsByCityHandler(request.params.cityName);
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
        params: searchHotelsByCityValidation,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
      auth: 'jwt',
    },

  },
];
