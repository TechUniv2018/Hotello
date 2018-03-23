const JWT = require('jsonwebtoken');
const Models = require('../../models');
const constants = require('../constants.json');

const updateHandlerForGet = (authorization) => {
  const decodedToken = JWT.decode(authorization, constants.JWT_SECRET);
  // console.log(decodedsToken.email, '###');
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

const updateHandlerForPut = (authorization, payload) => {
  console.log('PAYLOAD IS: ',payload);
  const decodedToken = JWT.decode(authorization, constants.JWT_SECRET);
  const promise = new Promise((resolve) => {
    Models.users.update(
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
      },
      {
        where: {
          email: decodedToken.email,
        },
      },
    ).then(() => {
      resolve({
        statusCode: 200,
        message: 'user updated',
      });
    });
  });
  return promise;
};
module.exports = { updateHandlerForGet, updateHandlerForPut };
