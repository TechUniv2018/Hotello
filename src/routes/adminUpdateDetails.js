const updateHandler = require('../controllers/adminUpdateDetails');

module.exports = [
  {
    method: 'POST',
    path: '/adminUpdateDetails',
    handler: (request, reply) => {
      const userDetailsPromise = updateHandler(request.headers.authorization);
      reply(userDetailsPromise);
    },
    config: {
      auth: 'jwt',
    },
  },
];
