const getRegisteredUsers = require('../controllers/viewRegisteredUsers');

module.exports = [
  {
    method: 'GET',
    path: '/viewRegisteredUser',
    handler: (request, reply) => {
      const usersRecordsPromise = getRegisteredUsers(request.headers.authorization);
      usersRecordsPromise
        .then(usersRecords => reply(usersRecords))
        .catch(error => reply(error.message));
    },
    config: {
      auth: 'jwt',
    },
  },
];

