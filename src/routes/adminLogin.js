const joiValidation = require('../schemes/adminLoginValidation');
const handlerFunction = require('../controllers/adminLogin.js');

module.exports = [
  {
    method: 'POST',
    path: '/adminLogin',
    handler: handlerFunction.validateAndSign,
    config: {
      auth: false,
      validate: {
        payload: joiValidation,
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

