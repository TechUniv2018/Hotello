const cancelBooking = require('../controllers/cancelBooking');

module.exports = [
  {
    method: 'DELETE',
    path: '/cancelBooking',
    handler: (request, reply) => {
      const cancelledPromise = cancelBooking(request.headers.authorization, request.payload);
      cancelledPromise
        .then(responseObj => reply(responseObj))
        .catch(error => reply(error.message));
    },
    config: {
      auth: 'jwt',
    },
  },
];
