const updateHandler = require('../controllers/userUpdateDetails');
const userUpdateDetailsValidation = require('../schemes/userUpdateDetailsValidation');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/userUpdateDetails',
    handler: (request, reply) => {
      const userDetailsPromise = updateHandler.updateHandlerForGet(request.headers.authorization);
      // console.log(userDetailsPromise, '&&&&');
      userDetailsPromise.then((userDetails) => { reply(userDetails); });
    },
    config: {
      tags: ['api'],
      auth: 'jwt',
      validate: {
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },
  },
  {
    method: 'PUT',
    path: '/userUpdateDetails',
    handler: (request, reply) => {
      const responsePromise = updateHandler.updateHandlerForPut(
        request.headers.authorization,
        request.payload,
      );
      responsePromise.then((response) => { reply(response); });
    },
    config: {
      tags: ['api'],
      auth: 'jwt',
      validate: {
        payload: userUpdateDetailsValidation,
        headers: Joi.object({ authorization: Joi.string() }).unknown(true),
      },
    },
  },
];
