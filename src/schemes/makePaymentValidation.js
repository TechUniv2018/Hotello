const Joi = require('joi');

const bookingId = Joi.string().min(5);

module.exports = Joi.object({
  // paymentId: Joi.string().alphanum().required().min(5)
  //   .example(12345678),
  basket: Joi.array().items(bookingId).min(1).required(),
  // currency: Joi.string().regex(/[A-Z]{2,}/).required(),
  amount: Joi.number().required().min(0),

});

