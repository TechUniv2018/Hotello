

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'users',
      'suspended',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('users', 'suspended')
  ,
};
