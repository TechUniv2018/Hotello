const Joi = require('joi');

const cityNameRegEx = /^[a-z ]+$/i;
const room = Joi.object({
  ADT: Joi.number().min(1).required(),
  CHD: Joi.number().min(0).optional(),
});


const dateRegEx = /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/;
const checkAvailabilityValidation = Joi.object({
  checkIn: Joi.string().regex(dateRegEx).required()
    .example('2018-03-15'),
  checkOut: Joi.string().regex(dateRegEx).required()
    .example('2018-03-16'),
  nationality: Joi.string().regex(/[A-Z]{2,}/).required().example('IN'),
  rooms: Joi.array().items(room).min(1)
    .required()
    .example([
      {
        ADT: 2,
      },
      {
        ADT: 1,
        CHD: 1,
      },
    ]),
  cityName: Joi.string().regex(cityNameRegEx).required().example('Bangalore'),
});

module.exports = checkAvailabilityValidation;
