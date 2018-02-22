const viewBookingsByCityHandler = require('../controllers/viewBookingsByCityHandler');
const CityNameValidation = require('../schemes/searchHotelsByCityValidation');

const handler = (request, reply) => {
  const data = viewBookingsByCityHandler(request.headers.authorization, request.params.cityName);
  data.then(reply);
};

module.exports = {
  path: '/viewBookingsByCity/{cityName}',
  method: 'GET',
  handler,
  config: {
    validate: {
      params: CityNameValidation,
    },
    auth: 'jwt',
  },
};
