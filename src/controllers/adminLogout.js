const JWT = require('jsonwebtoken');
const constants = require('../constants.json');

module.exports = (authorization) => {
  console.log('The jwt token is: ', authorization);
  const decodedToken = JWT.decode(authorization, constants.JWT_SECRET);
  decodedToken.exp = Math.floor(Date.now() / 1000);
  return (JWT.sign(decodedToken, constants.JWT_SECRET));
};
