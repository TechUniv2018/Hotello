const searchHotelsByCityValidation = require('../schemes/searchHotelsByCityValidation');

module.exports = [
  {
    method: 'GET',
    path: '/searchHotelsByCity/{cityName}',
    handler: (request, reply) => {
      reply('Name OK');
    },
    config: {
      validate: {
        params: searchHotelsByCityValidation,
      },
      auth: 'jwt',
    },

  },
];
