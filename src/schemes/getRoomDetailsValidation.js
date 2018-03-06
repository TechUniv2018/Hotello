const Joi = require('joi');

module.exports = Joi.object({
  hotelId: Joi.number().required().min(1)
    .example(1234),
  roomId: Joi.string().required().min(10).example('c73894a7-cb0e-4bd9-83ec-320743624ee1'),
});

