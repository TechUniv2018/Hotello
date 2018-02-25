const cancelBooking = require('../controllers/cancelBooking');
const JWT = require('jsonwebtoken');
const Models = require('../../models');
const constants = require('../constants.json');

module.exports = [
  {
    method: 'DELETE',
    path: '/adminCancelBooking',
    handler: (request, reply) => {
      const token = request.headers.authorization;
      const decodedToken = JWT.decode(token, constants.JWT_SECRET);
      Models.users.find({
        email: decodedToken.email,
      }).then(() => {
        const cancelledPromise = cancelBooking(token, request.payload);
        cancelledPromise
          .then(responseObj => reply(responseObj))
          .catch(error => reply(error.message));
      });
    },
    config: {
      auth: 'jwt',
    },
  },
];
