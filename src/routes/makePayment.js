const makePaymentHandler = require('../controllers/makePaymentHandler');
const makePaymentValidation = require('../schemes/makePaymentValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/makePayment',
    handler: (request, reply) => {
      const result = makePaymentHandler(request.headers.authorization, request.payload);
      result.then((resultValue) => {
        if (resultValue === 'Error') {
          reply('Error').code(500);
        } else if (resultValue === 'Successful') {
        // console.log(resultValue.hotel.rooms);
          reply('Successful').code(204);
        } else {
          reply(resultValue);
        }
      });
    },
    config: {
      tags: ['api'],
      auth: 'jwt',
      validate: {
        payload: makePaymentValidation,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },

  },
];