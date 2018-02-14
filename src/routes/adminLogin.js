const Joi = require('joi');
const handlerFunction = require('../controllers/adminLogin.js');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: handlerFunction.validateAndSign,
    config: {
      auth: false,
      validate: {
        payload: Joi.object({
          username: Joi.string().required().min(6),
          password: Joi.string().required().min(8),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/jwtVerification',
    config: {
      auth: 'jwt',
    },
    handler: (request, reply) => {
      console.log(request.payload);
      reply('jwt verified');
    },
  },
];
