const Joi = require('joi');

const phoneNumberRegEx = /^\d{10}$/;
const nameRegEx = /^[a-z]+$/i;

module.exports = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  phoneNumber: Joi.number().min(10),
}).options({ abortEarly: false });
