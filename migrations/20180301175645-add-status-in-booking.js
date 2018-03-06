module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'bookings',
      'status',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface, Sequelize) => [
    queryInterface.removeColumn('bookings', 'status'),
  ],
};
