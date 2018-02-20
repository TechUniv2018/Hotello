const updateHandler = require('../controllers/adminUpdateDetails');
const adminUpdateDetailsValidation = require('../schemes/adminUpdateDetailsValidation');

module.exports = [
  {
    method: 'POST',
    path: '/adminUpdateDetails',
    handler: (request, reply) => {
      const userDetailsPromise = updateHandler(request.headers.authorization, request.payload);
      reply(userDetailsPromise);
    },
    config: {
      validate: {
        payload: adminUpdateDetailsValidation,
      },
      auth: false,
    },

  },
];
