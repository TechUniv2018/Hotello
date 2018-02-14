const Joi = require('joi');

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/;
const joiValidation = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().required().regex(passRegex),
});
module.exports = joiValidation;
