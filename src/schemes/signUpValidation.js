const Joi = require('joi');

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&_]{8,}/;
const roleRegExp = /user/;
const phoneNumberRegEx = /^\d{10}$/;

module.exports = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required().regex(passwordRegExp),
  role: Joi.string().required().regex(roleRegExp),
  phoneNumber: Joi.string().required().regex(phoneNumberRegEx),
}).options({ abortEarly: false });
