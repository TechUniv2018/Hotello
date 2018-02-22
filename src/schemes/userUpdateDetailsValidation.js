const Joi = require('joi');

const phoneNumberRegEx = /^\d{10}$/;

module.exports = Joi.object({
  firstName: Joi.string().required().example('Alexx'),
  lastName: Joi.string().required().example('Cage'),
  phoneNumber: Joi.string().required().regex(phoneNumberRegEx).example('9899877654'),
});

