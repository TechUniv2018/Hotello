const signUpValidation = require('../schemes/signUpValidation');
const handler = require('../controllers/userSignUpHandler');


module.exports = {
  path: '/userSignUp',
  method: 'POST',
  handler,
  config: {
    validate: {
      payload: signUpValidation,
    },
    auth: false,
  },
};

