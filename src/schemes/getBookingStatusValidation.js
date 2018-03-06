const Joi = require('joi');

module.exports = Joi.object({
  pnr: Joi.string().required().min(2).example('c7389'),
});

