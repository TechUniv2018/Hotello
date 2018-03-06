const crypto = require('crypto');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    email: 'admin@hotello.com',
    password: crypto.createHash('md5').update('Hotello@12').digest('hex'),
    role: 'admin',
  },
  {
    email: 'publicUser@hotello.com',
    password: crypto.createHash('md5').update('PublicUser@1234').digest('hex'),
    // password: 'PublicUser@1234',
    role: 'publicUser',
  },
  {
    email: 'kukkal@gmail.com',
    firstName: 'Ajay',
    lastName: 'Singh',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'blob@gmail.com',
    firstName: 'blob',
    lastName: 'blobby',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'kukoop@gmail.com',
    firstName: 'Vijay',
    lastName: 'Singh',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'blah@gmail.com',
    firstName: 'blah',
    lastName: 'blobby',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'glob@gmail.com',
    firstName: 'glob',
    lastName: 'globby',
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
