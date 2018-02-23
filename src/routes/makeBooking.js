const makeBookingHandler = require('../controllers/makeBooking.js');
const dbSaveBooking = require('../controllers/saveBooking');
const bookingsValidation = require('../schemes/bookingsValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/bookHotel',
    handler: (request, reply) => {
      // console.log('handler');
      const result = makeBookingHandler(request.headers.authorization, request.payload);
      result.then((res) => {
        if (res.booking) {
          dbSaveBooking(request.headers.authorization, res.booking);
          reply(res.booking);
        } else reply(res);
      });
    },
    config: {
      tags: ['api'],
      validate: {
        payload: bookingsValidation,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
      auth: 'jwt',
    },
  },
];
