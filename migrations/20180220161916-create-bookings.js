'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookingid: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      bookingdate: {
        type: Sequelize.DATEONLY
      },
      amount: {
        type: Sequelize.FLOAT
      },
      hotelname: {
        type: Sequelize.STRING
      },
      checkin: {
        type: Sequelize.DATEONLY
      },
      checkout: {
        type: Sequelize.DATEONLY
      },
      numofguests: {
        type: Sequelize.INTEGER
      },
      numofrooms: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookings');
  }
};