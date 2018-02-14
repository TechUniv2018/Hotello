const Joi = require('joi');
const handlerFunction = require('../controllers/adminLogin.js');

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
module.exports = [
  {
    method: 'POST',
    path: '/adminLogin',
    handler: handlerFunction.validateAndSign,
    config: {
      auth: false,
      validate: {
        payload: Joi.object({
          username: Joi.string().email().required(),
          password: Joi.string().required().regex(passRegex),
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

