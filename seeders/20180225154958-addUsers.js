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
    email: 'AjaySingh@gmail.com',
    firstName: 'Ajay',
    lastName: 'Singh',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'KyleChandler@gmail.com',
    firstName: 'Kyle',
    lastName: 'Chandler',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'VijaySingh@gmail.com',
    firstName: 'Vijay',
    lastName: 'Singh',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'ViratKohli@gmail.com',
    firstName: 'Virat',
    lastName: 'Kohli',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'AshishNehra@gmail.com',
    firstName: 'Ashish',
    lastName: 'Nehra',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  }], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),

};
