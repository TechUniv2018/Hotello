const adminViewBookingsHandler = require('../controllers/adminViewBookingsHandler');
const Joi = require('joi');

const handler = (request, reply) => {
  const data = adminViewBookingsHandler(request.headers.authorization);
  // reply(data);
  data.then(reply);
};

module.exports = {
  path: '/adminViewBookings',
  method: 'GET',
  handler,
  config: {
    validate: {
      headers: Joi.object({ authorization: Joi.string() }).unknown(true),
    },
    tags: ['api'],
    auth: 'jwt',
  },
};
