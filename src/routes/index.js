const login = require('./adminLogin.js');
const logout = require('./adminLogout.js');
const updateDetails = require('./userUpdateDetails.js');
const publicLogin = require('./publicLogin.js');
const userSignUp = require('./userSignUp');
const suspendUser = require('./suspendUser');
const adminViewBookings = require('./adminViewBookings');
const addUser = require('./addUser');
const deleteUser = require('./deleteUser');
const adminUpdateDetails = require('./adminUpdateDetails');
const searchHotelsByCity = require('./searchHotelsByCity');
const checkAvailability = require('./checkAvailability');
const viewHotelDetails = require('./viewHotelDetails');
const viewRegisteredUsers = require('./viewRegisteredUsers');
const userViewBookings = require('./userViewBookings');
const viewBookingsbyCity = require('./viewBookingsByCity');
const bookHotel = require('./bookHotel');
const getRoomDetails = require('./getRoomDetails');
const makePayment = require('./makePayment');
const getBookingStatus = require('./getBookingStatus');
const adminCancelBooking = require('./adminCancelBooking');
const unsuspendUser = require('./unsuspendUser');

module.exports = [].concat(
  addUser,
  userSignUp,
  publicLogin,
  login,
  logout,
  updateDetails,
  suspendUser,
  adminUpdateDetails,
  deleteUser,
  searchHotelsByCity,
  adminViewBookings,
  viewRegisteredUsers,
  viewHotelDetails,
  checkAvailability,
  userViewBookings,
  viewBookingsbyCity,
  bookHotel,
  getRoomDetails,
  makePayment,
  getBookingStatus,
  adminCancelBooking,
  unsuspendUser,
);
