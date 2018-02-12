module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.BIGINT,
    email_id: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    dob: DataTypes.DATE,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return users;
};
