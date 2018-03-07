const Joi = require('joi');

module.exports = Joi.object({
  pnr: Joi.string().required(),
});

