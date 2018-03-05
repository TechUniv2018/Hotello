const Joi = require('joi');

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/;
const joiValidation = Joi.object({
  email: Joi.string().email().required().example('alex@gmail.com'),
  password: Joi.string().required().regex(passRegex).example('P@$$w0rd'),
});
module.exports = joiValidation;
