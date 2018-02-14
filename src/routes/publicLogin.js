const Joi = require('joi');
const publicLoginHandler = require('../controllers/publicLoginHandler');

module.exports = [
  {
    method: 'POST',
    path: '/publicLogin',
    handler: publicLoginHandler,
    config: {
      validate: {
        payload: Joi.object({
          username: Joi.string().alphanum().required().min(4)
            .max(30),
          password: Joi.string().alphanum().required().min(8)
            .max(30),
        }),
      },
      auth: false,
    },
  },
];
