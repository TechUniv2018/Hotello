const JWT = require('jsonwebtoken');
const Models = require('../../models');

const getUserDetails = (authorization) => {
  const decodedToken = JWT.decode(authorization, 'RandomSecretString');
  const promise = new Promise((resolve) => {
    Models.users.find({
      where: {
        email: decodedToken.email,
      },
    }).then((user) => {
      const userDetails = {
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        email: user.dataValues.email,
        phoneNumber: user.dataValues.phoneNumber,
      };
      resolve(userDetails);
    });
  });
  return promise;
};
module.exports = getUserDetails;
