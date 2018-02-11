const Joi = require('joi');

const handler = (request, reply) => {
  reply('User Signed Up!').code(201);
};

module.exports = {
  path: '/usersignup',
  method: 'POST',
  handler,
  config: {
    validate: {
      payload: Joi.object({
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().alphanum().min(4).max(30)
          .required(),
        password: Joi.string().required().min(8),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
      }),
    },
  },
};

