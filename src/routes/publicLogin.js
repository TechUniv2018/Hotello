const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/publicLogin',
    handler: (request, reply) => {
      reply('Login OK');
    },
  },
];
