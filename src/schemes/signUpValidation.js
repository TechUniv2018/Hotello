const Joi = require('joi');

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
const roleRegExp = /user/;

module.exports = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required().regex(passwordRegExp),
  role: Joi.string().required().regex(roleRegExp),
}).options({ abortEarly: false });
