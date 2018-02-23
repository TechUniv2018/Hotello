const getRegisteredUsers = require('../controllers/viewRegisteredUsers');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/viewRegisteredUsers',
    handler: (request, reply) => {
      const usersRecordsPromise = getRegisteredUsers(request.headers.authorization);
      usersRecordsPromise
        .then(usersRecords => reply(usersRecords))
        .catch(error => reply(error.message));
    },
    config: {
      tags: ['api'],
      auth: 'jwt',
      validate: {
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },
  },
];

