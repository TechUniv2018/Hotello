const Joi = require('joi');

const phoneNumberRegEx = /^\d{10}$/;
const nameRegEx = /^[a-z]+$/i;

module.exports = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().optional().regex(nameRegEx),
  lastName: Joi.string().optional().regex(nameRegEx),
  phoneNumber: Joi.string().optional().regex(phoneNumberRegEx),
}).options({ abortEarly: false });
