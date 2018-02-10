const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: (request, reply) => {
      reply('login successful');
    },
    config: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required().min(6),
          password: Joi.string().required().min(8),
        }),
      },
    },
  },
];
