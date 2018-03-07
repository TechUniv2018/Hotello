

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'bookings',
      'status',
      {
        type: Sequelize.STRING,
        defaultValue: false,
      },
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('bookings', 'status')
  ,
};
