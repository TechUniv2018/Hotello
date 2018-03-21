

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'users',
      'address',
      {
        type: Sequelize.JSONB,
        defaultValue: false,
      },
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('bookings', 'status')
  ,
};
