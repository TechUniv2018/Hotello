
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    suspended: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return users;
};
