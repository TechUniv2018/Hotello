const publicLoginHandler = require('../controllers/publicLoginHandler');
const publicLoginValidation = require('../schemes/publicLoginValidation');

module.exports = [
  {
    method: 'POST',
    path: '/publicLogin',
    handler: publicLoginHandler,
    config: {
      tags: ['api'],
      validate: {
        payload: publicLoginValidation,
      },
      auth: false,
    },
  },
];
