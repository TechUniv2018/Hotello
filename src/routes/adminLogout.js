const Models = require('../../models');
const JWT = require('jsonwebtoken');
const Joi = require('joi');
const handlerFunction = require('../controllers/adminLogin.js');

module.exports = [
  {
    method: 'POST',
    path: '/logout',
    handler: (request, reply) => {
      console.log('The jwt token is: ', request.headers.authorization);
      const decodedToken = JWT.decode(request.headers.authorization, 'NeverShareYourSecret');
      decodedToken.exp = Math.floor(Date.now() / 1000);
      reply(JWT.sign(decodedToken, 'NeverShareYourSecret'));
    },
    config: {
      auth: 'jwt',

    },
  },

];
