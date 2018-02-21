const adminViewBookingsHandler = require('../controllers/adminViewBookingsHandler');

const handler = (request, reply) => {
  const data = adminViewBookingsHandler(request.headers.authorization);
  reply(data);
};

module.exports = {
  path: '/adminViewBookings',
  method: 'GET',
  handler,
  config: {
    auth: 'jwt',
  },
};
