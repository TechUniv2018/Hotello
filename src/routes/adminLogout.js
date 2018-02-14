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
      reply('Logged out');
    },
    config: {
      auth: 'jwt',

    },
  },

];
