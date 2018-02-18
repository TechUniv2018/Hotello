const login = require('./adminLogin.js');
const logout = require('./adminLogout.js');
const updateDetails = require('./adminUpdateDetails.js');

module.exports = [].concat(login).concat(logout).concat(updateDetails);
