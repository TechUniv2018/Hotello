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
    firstName: 'Public',
    lastName: 'User',
    role: 'publicUser',
    phoneNumber: '7823294590',
  },
  {
    email: 'ajaysingh@gmail.com',
    firstName: 'Ajay',
    lastName: 'Singh',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '8903298390',
  },
  {
    email: 'kylechandler@gmail.com',
    firstName: 'Kyle',
    lastName: 'Chandler',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'vijaysingh@gmail.com',
    firstName: 'Vijay',
    lastName: 'Singh',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '7827358390',
  },
  {
    email: 'viratkohli@gmail.com',
    firstName: 'Virat',
    lastName: 'Kohli',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '9113298390',
  },
  {
    email: 'ashishnehra@gmail.com',
    firstName: 'Ashish',
    lastName: 'Nehra',
    password: crypto.createHash('md5').update('P@$$w0rd').digest('hex'),
    role: 'publicUser',
    phoneNumber: '9453298390',
  }], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),

};
