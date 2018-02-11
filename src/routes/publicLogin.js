const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/publicLogin',
    handler: (request, reply) => {
      reply('Login OK');
    },
    config: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required().min(4)
            .max(30),
          password: Joi.string().required().min(8)
            .max(30),
        }),
      },
    },
  },
];
