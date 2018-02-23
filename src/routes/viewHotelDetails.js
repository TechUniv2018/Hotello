const viewHotelDetailsHandler = require('../controllers/viewHotelDetailsHandler');

module.exports = [
  {
    method: 'GET',
    path: '/viewHotelDetails/{hotelId}',
    handler: (request, reply) => {
      const result = viewHotelDetailsHandler(request.params.hotelId);
      result.then((resultValue) => {
        if (resultValue === 'Error') {
          reply('Error').code(500);
        }
        // console.log(resultValue.hotel.rooms);
        reply(resultValue.hotel);
      });
    },
    config: {
      tags: ['api'],
      auth: 'jwt',
    },

  },
];
