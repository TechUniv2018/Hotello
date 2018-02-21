const JWT = require('jsonwebtoken');
const Models = require('../../models');

const adminViewBookingshandler = (authorization) => {
  const decodedToken = JWT.decode(authorization, 'RandomSecretString');
  console.log(decodedToken);
  return Models.users.findOne({
    where: {
      email: decodedToken.email,
    },
  }).then((value) => {
    if (value != null) {
      if (value.dataValues.role === 'admin') {
        return Models.bookings.findAll().then(allBookings => allBookings);
      }
    }
    return true;
  });
};

module.exports = adminViewBookingshandler;
