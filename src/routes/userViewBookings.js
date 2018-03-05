const userViewBookingsHandler = require('../controllers/userViewBookingsHandler');
const Joi = require('joi');

const handler = (request, reply) => {
  const data = userViewBookingsHandler(request.headers.authorization);
  data.then(reply);
};

module.exports = {
  path: '/userViewBookings',
  method: 'GET',
  handler,
  config: {
    tags: ['api'],
    validate: {
      headers: Joi.object({ authorization: Joi.string() }).unknown(true),
    }
  },
};

