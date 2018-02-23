const JWT = require('jsonwebtoken');
const Models = require('../../models');
const constants = require('../constants.json');

module.exports = (authorization, booking) => {
  const promise = new Promise((resolve) => {
    const decodedToken = JWT.decode(authorization, constants.JWT_SECRET);
    let guests = 0;
    for (let i = 0; i < booking.hotel.rooms.length; i += 1) {
      guests += booking.hotel.rooms[i].paxes.length;
    }
    Models.bookings.create({
      bookingid: booking.reference,
      email: decodedToken.email,
      bookingdate: booking.creationDate,
      amount: booking.totalNet,
      hotelname: booking.hotel.name,
      checkin: booking.hotel.checkIn,
      checkout: booking.hotel.checkOut,
      numofguests: guests,
      numofrooms: booking.hotel.rooms.length,
      city: booking.hotel.destinationName,
    }).then(() => {
      resolve();
    });
  });
  return promise;
};

