const Joi = require('joi');

const cityNameRegEx = /^[a-z ]+$/i;
const searchHotelsByCityValidation = Joi.object({
  cityName: Joi.string().regex(cityNameRegEx).required()
    .example('Bangalore'),
});

module.exports = searchHotelsByCityValidation;
