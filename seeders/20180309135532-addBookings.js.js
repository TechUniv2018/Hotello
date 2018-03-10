

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('bookings', [{
    bookingid: 'ref3456',
    email: 'ajaysingh@gmail.com',
    bookingdate: '2018-02-15',
    amount: 1720.00,
    hotelname: 'Royal Orchid',
    checkin: '2018-02-20',
    checkout: '2018-02-25',
    numofguests: 2,
    numofrooms: 1,
    city: 'Bangalore',
    status: 'confirmed',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    bookingid: 'ref3457',
    email: 'alexander@gmail.com',
    bookingdate: '2018-05-15',
    amount: 2120.00,
    hotelname: 'Grand Orchid',
    checkin: '2018-02-20',
    checkout: '2018-02-25',
    numofguests: 1,
    numofrooms: 1,
    city: 'Bangalore',
    status: 'cancelled',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) =>
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */
    queryInterface.bulkDelete('bookings', null, {}),

};
