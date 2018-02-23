const Joi = require('joi');
const addUserHandler = require('../controllers/addUser');
const Validation = require('../schemes/signUpValidation');

module.exports = [{
  method: 'POST',
  path: '/addUser',
  handler: (request, reply) => {
    const userDetailsPromise = addUserHandler(request.headers.authorization, request.payload);
    userDetailsPromise
      .then(userDetails => reply(userDetails))
      .catch(error => reply(error.message));
  },
  config: {
    tags: ['api'],
    validate: {
      payload: Validation,
      headers: Joi.object({ authorization: Joi.string() }).unknown(true),
    },
    auth: 'jwt',
  },
}];
