

module.exports = (sequelize, DataTypes) => {
  const bookings = sequelize.define('bookings', {
    bookingid: DataTypes.STRING,
    email: DataTypes.STRING,
    bookingdate: DataTypes.DATEONLY,
    amount: DataTypes.FLOAT,
    hotelname: DataTypes.STRING,
    checkin: DataTypes.DATEONLY,
    checkout: DataTypes.DATEONLY,
    numofguests: DataTypes.INTEGER,
    numofrooms: DataTypes.INTEGER,
    city: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return bookings;
};
