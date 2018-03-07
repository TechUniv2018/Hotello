const crypto = require('crypto');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    email: 'admin@hotello.com',
    firstName: 'Arpita',
    lastName: 'Jain',
    password: crypto.createHash('md5').update('Hotello@12').digest('hex'),
    role: 'admin',
  },
  {
    email: 'publicUser@hotello.com',
    password: crypto.createHash('md5').update('PublicUser@1234').digest('hex'),
    firstName: 'Vikas',
    lastName: 'Sharma',
    phoneNumber: '8977767555',
    role: 'publicUser',
  },
  {
    email: 'ajay@gmail.com',
    firstName: 'Ajay',
    lastName: 'Singh',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'Vinay@gmail.com',
    firstName: 'Vinay',
    lastName: 'Prakash',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'vijay@gmail.com',
    firstName: 'Vijay',
    lastName: 'Singh',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'aparna@gmail.com',
    firstName: 'Aparna',
    lastName: 'Rajput',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'priya@gmail.com',
    firstName: 'Priya',
    lastName: 'Gupta',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  }], {}),

  down: (queryInterface, Sequelize) =>
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    queryInterface.bulkDelete('users', null, {}),

};
