const Joi = require('joi');

const dateRegEx = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
const checkAvailabilityValidation = Joi.object({
  checkIn: Joi.string().regex(dateRegEx).required()
    .example('2018-03-15'),
  checkOut: Joi.string().regex(dateRegEx).required()
    .example('2018-03-16'),
  rooms: Joi.number().integer().min(1).required()
    .example(1),
  adults: Joi.number().integer().min(1).required()
    .example(1),
  children: Joi.number().integer().min(0).required()
    .example(0),
  childrenAges: Joi.array().items(Joi.number().integer().min(0).max(17)).when('children', { is: Joi.number().integer().min(1), then: Joi.required().example([]), otherwise: Joi.optional() }),
  hotels: Joi.array().items(Joi.number().integer().min(1)).required()
    .example([1067,
      182125,
      187939,
      212167,
      215417]),
});

module.exports = checkAvailabilityValidation;
