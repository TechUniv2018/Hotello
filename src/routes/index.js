const login = require('./adminLogin.js');
const logout = require('./adminLogout.js');
const updateDetails = require('./adminUpdateDetails.js');
const publicLogin = require('./publicLogin.js');
const userSignUp = require('./userSignUp');

module.exports = [].concat(userSignUp, publicLogin, login, logout, updateDetails);
