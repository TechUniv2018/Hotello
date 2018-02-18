const handlerFunction = require('../controllers/adminUpdateDetails');

module.exports = [
  {
    method: 'PUT',
    path: '/adminDetails',
    handler: handlerFunction,
  },
];
