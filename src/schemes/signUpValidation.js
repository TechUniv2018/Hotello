const Joi = require('joi');

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}/;
const roleRegExp = /^(admin|publicUser)$/;
const phoneNumberRegEx = /^\d{10}$/;

module.exports = Joi.object({
  email: Joi.string().email().required().example('alex@gmail.com'),
  firstName: Joi.string().required().example('Alex'),
  lastName: Joi.string().required().example('Cage'),
  password: Joi.string().required().regex(passwordRegExp).example('P@$$w0rd'),
  role: Joi.string().required().regex(roleRegExp).example('admin'),
  phoneNumber: Joi.string().required().regex(phoneNumberRegEx).example('9899877654'),
}).options({ abortEarly: false });
