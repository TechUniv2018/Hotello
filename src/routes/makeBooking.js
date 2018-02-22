const makeBookingHandler = require('../controllers/makeBooking.js');

module.exports = [
  {
    method: 'POST',
    path: '/bookHotel',
    handler: (request, reply) => {
      // console.log('handler');
      const result = makeBookingHandler(request.headers.authorization, request.payload);
      reply(result);
    },
  },
];
