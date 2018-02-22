const JWT = require('jsonwebtoken');
const Models = require('../../models');

const adminViewBookingsHandler = (authorization, cityName) => {
  const decodedToken = JWT.decode(authorization, 'RandomSecretString');
  const requesterEmail = decodedToken.email;

  return Models.users.findOne({ where: { email: requesterEmail } })
    .then((value) => {
      if (value !== null) {
        if (value.dataValues.role === 'admin') {
          return Models.bookings.findAll({
            where: { city: cityName },
            attributes: ['amount', 'bookingdate', 'bookingid', 'checkin', 'checkout', 'email', 'city', 'hotelname', 'numofguests', 'numofrooms'],
          })
            .then((allBookings) => {
              const result = allBookings.map(element => element.dataValues);
              return result;
            });
        }
      }
      return 'Unauthorized';
    });
};

module.exports = adminViewBookingsHandler;
