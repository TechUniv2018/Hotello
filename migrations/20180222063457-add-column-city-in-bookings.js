

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'bookings',
      'city',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn('bookings', 'city'),
  ],
};
