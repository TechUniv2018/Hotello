const Joi = require('joi');
const publicLoginHandler = require('../controllers/publicLoginHandler');
const publicLoginValidation = require('../schemes/publicLoginValidation');

module.exports = [
  {
    method: 'POST',
    path: '/publicLogin',
    handler: publicLoginHandler,
    config: {
      validate: {
        payload: publicLoginValidation,
      },
      auth: false,
    },
  },
];
