const Joi = require('joi');
const Models = require('../../models');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: (request, reply) => {
      Models.users.find({ where: { username: request.payload.username } }).then((user) => {
        if (user.dataValues.password === request.payload.password) {
          reply('Valid credentials');
        } else {
          reply('Invalid credentials');
        }
      });
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
