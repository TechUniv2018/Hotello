const Joi = require('joi');

const phoneNumberRegEx = /^\d{10}$/;
const nameRegEx = /^[a-z]+$/i;

module.exports = Joi.object({
  email: Joi.string().email().required().example('alex@gmail.com'),
  firstName: Joi.string().optional().regex(nameRegEx).example('Alex'),
  lastName: Joi.string().optional().regex(nameRegEx).example('Cage'),
  phoneNumber: Joi.string().optional().regex(phoneNumberRegEx).example('98998767654'),
}).options({ abortEarly: false });
