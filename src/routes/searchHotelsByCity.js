const searchHotelsByCityValidation = require('../schemes/searchHotelsByCityValidation');
const searchHotelsByCityHandler = require('../controllers/searchHotelsByCityHandler');

module.exports = [
  {
    method: 'GET',
    path: '/searchHotelsByCity/{cityName}',
    handler: (request, reply) => {
      const result = searchHotelsByCityHandler(request.params.cityName);
      result.then(reply);
    },
    config: {
      validate: {
        params: searchHotelsByCityValidation,
      },
      auth: 'jwt',
    },

  },
];
