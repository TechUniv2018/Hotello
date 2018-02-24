const Joi = require('joi');

module.exports = Joi.object({
  hotelId: Joi.number().required()
    .example(1),
});

