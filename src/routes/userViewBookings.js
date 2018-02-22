const userViewBookingsHandler = require('../controllers/userViewBookingsHandler');

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
  },
};

