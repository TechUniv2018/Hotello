const searchHotelsByCityValidation = require('../schemes/searchHotelsByCityValidation');

module.exports = [
  {
    method: 'GET',
    path: '/searchHotelsByCity/{cityName}',
    handler: (request, reply) => {
      reply(request.params.cityName);
    },
    config: {
      validate: {
        params: searchHotelsByCityValidation,
      },
      auth: 'jwt',
    },

  },
];
