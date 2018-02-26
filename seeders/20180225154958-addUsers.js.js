

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    email: 'admin@hotello.com',
    password: 'Hotello@12',
    role: 'admin',
  },
  {
    email: 'publicUser@hotello.com',
    password: 'PublicUser@1234',
    role: 'publicUser',
  },
  {
    email: 'kukkal@gmail.com',
    firstName: 'Ajay',
    lastName: 'Singh',
    password: 'P@$$w0rd',
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'blob@gmail.com',
    firstName: 'blob',
    lastName: 'blobby',
    password: 'P@$$w0rd',
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'kukoop@gmail.com',
    firstName: 'Vijay',
    lastName: 'Singh',
    password: 'P@$$w0rd',
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'blah@gmail.com',
    firstName: 'blah',
    lastName: 'blobby',
    password: 'P@$$w0rd',
    role: 'publicUser',
    phoneNumber: '7823298390',
  },
  {
    email: 'glob@gmail.com',
    firstName: 'glob',
    lastName: 'globby',
    password: 'P@$$w0rd',
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
