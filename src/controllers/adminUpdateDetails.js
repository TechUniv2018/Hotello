const JWT = require('jsonwebtoken');
const Models = require('../../models');

const adminUpdateDetailsHandler = (authorization) => {
  const decodedToken = JWT.decode(authorization, 'RandomSecretString');
  return decodedToken;
};
module.exports = adminUpdateDetailsHandler;
