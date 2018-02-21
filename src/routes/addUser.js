const addUserHandler = require('../controllers/addUser');
const Validation = require('../schemes/signUpValidation');

module.exports = [{
  method: 'POST',
  path: '/addUser',
  handler: (request, reply) => {
    const userDetailsPromise = addUserHandler(request.headers.authorization, request.payload);
    userDetailsPromise
        .then(userDetails => reply(userDetails))
        .catch(error => reply(error));
  },
  config: {
    validate: {
      payload: Validation,
    },
    auth: 'jwt',
  },
}];