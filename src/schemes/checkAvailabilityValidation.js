const Joi = require('joi');

const dateRegEx = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
const checkAvailabilityValidation = Joi.object({
  checkIn: Joi.string().regex(dateRegEx).required(),
  checkOut: Joi.string().regex(dateRegEx).required(),
  rooms: Joi.number().integer().min(1).required(),
  adults: Joi.number().integer().min(1).required(),
  children: Joi.number().integer().min(0).required(),
  childrenAges: Joi.array().items(Joi.number().integer().min(0).max(17)).when('children', { is: Joi.number().integer().min(1), then: Joi.required(), otherwise: Joi.optional() }),
  hotelCode: Joi.number().integer().min(1).required(),
});

module.exports = checkAvailabilityValidation;
