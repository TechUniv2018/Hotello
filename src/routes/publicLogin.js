const Joi = require('joi');
const Models = require('../../models');

module.exports = [
  {
    method: 'POST',
    path: '/publicLogin',
    handler: (request, reply) => {
      Models.users.findOne({ where: { username: request.payload.username } }).then((user) => {
        if (user !== null) {
          if (user.dataValues.password === request.payload.password) {
            reply('Valid credentials');
          } else {
            reply('Invalid credentials');
          }
        } else {
          reply('User does not exist');
        }
      });
    },
    config: {
      validate: {
        payload: Joi.object({
          username: Joi.string().alphanum().required().min(4)
            .max(30),
          password: Joi.string().alphanum().required().min(8)
            .max(30),
        }),
      },
    },
  },
];
