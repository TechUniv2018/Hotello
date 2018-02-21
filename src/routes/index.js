const login = require('./adminLogin.js');
const logout = require('./adminLogout.js');
const updateDetails = require('./userUpdateDetails.js');
const publicLogin = require('./publicLogin.js');
const userSignUp = require('./userSignUp');
const suspendUser = require('./suspendUser');
const addUser = require('./addUser');

module.exports = [].concat(
  addUser, userSignUp, publicLogin, login, logout,
  updateDetails, suspendUser,
);
