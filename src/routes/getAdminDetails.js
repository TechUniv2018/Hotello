const adminDetailsHandler = require('../controllers/adminDetailsHandler');
// const adminDetailsValidation = require('../schemes/adminDetailsValidation');
// const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/adminDetails',
    handler: (request, reply) => {
      const userDetailsPromise = adminDetailsHandler(request.headers.authorization);

      userDetailsPromise.then((res) => {
        // console.log('$$$$$$', res);
        reply(res);
      });
    //   reply(userDetailsPromise);
    },
    // config: {
    //   tags: ['api'],
    //   validate: {
    //     payload: adminDetailsValidation,
    //     headers: Joi.object({ authorization: Joi.string() }).unknown(true),
    //   },
    //   auth: 'jwt',
    // },

  },
];
