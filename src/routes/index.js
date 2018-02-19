const publicLogin = require('./publicLogin.js');
const userSignUp = require('./userSignUp');

module.exports = [].concat(userSignUp, publicLogin);
