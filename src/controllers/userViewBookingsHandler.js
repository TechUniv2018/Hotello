const JWT = require('jsonwebtoken');
const Models = require('../../models');

const userViewBookingsHandler = (authorization) => {
  const decodedToken = JWT.decode(authorization, 'RandomSecretString');
  const requesterEmail = decodedToken.email;
  return Models.users.findOne({
    where: { email: requesterEmail },
  }).then((value) => {
    if (value !== null) {
      if (value.dataValues.role === 'user') {
        return Models.bookings.findAll({
          attributes: ['amount', 'bookingdate', 'bookingid', 'checkin', 'checkout', 'email', 'city', 'hotelname', 'numofguests', 'numofrooms'],
          where: {
            email: requesterEmail,
          },
        }).then((allUserBookings) => {
          const result = allUserBookings.map(element => element.dataValues);
          return result;
        });
      }
    }
    return 'Unauthorized';
  });
};

module.exports = userViewBookingsHandler;

