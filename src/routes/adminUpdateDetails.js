const updateHandler = require('../controllers/adminUpdateDetails');

module.exports = [
  {
    method: 'GET',
    path: '/adminDetails',
    handler: (request, reply) => {
      const userDetailsPromise = updateHandler(request.headers.authorization);
      // console.log(userDetailsPromise);
      userDetailsPromise.then((userDetails) => { reply(userDetails); });
    },
    config: {
      auth: 'jwt',
    },
  },
];
