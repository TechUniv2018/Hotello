const login = require('./adminLogin.js');
const logout = require('./adminLogout.js');
const updateDetails = require('./userUpdateDetails.js');
const publicLogin = require('./publicLogin.js');
const userSignUp = require('./userSignUp');
const suspendUser = require('./suspendUser');
const deleteUser = require('./deleteUser');
const adminUpdateDetails = require('./adminUpdateDetails');
const searchHotelsByCity = require('./searchHotelsByCity');

module.exports = [].concat(userSignUp, publicLogin, login, logout, updateDetails, suspendUser, adminUpdateDetails, deleteUser, searchHotelsByCity);
