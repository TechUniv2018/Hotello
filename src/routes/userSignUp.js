const signUpValidation = require('../schemes/signUpValidation');
const handler = require('../controllers/userSignUpHandler');


module.exports = {
  path: '/usersignup',
  method: 'POST',
  handler,
  config: {
    validate: {
      payload: signUpValidation,
    },
  },
};

