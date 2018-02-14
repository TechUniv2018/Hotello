
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.BIGINT,
    },
    email_id: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
    dob: {
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
