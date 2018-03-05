const JWT = require('jsonwebtoken');
const Models = require('../../models');
const constants = require('../constants.json');


const deleteUserHandler = (token, payload) => {
  const decodedToken = JWT.decode(token, constants.JWT_SECRET);
  const promise = new Promise((resolve, reject) => {
    Models.users.find({
      where: {
        email: decodedToken.email,
      },
    }).then((user) => {
      if (user.dataValues.role === 'admin') {
        Models.users.destroy({
          where: {
            email: payload.email,
          },
        }).then(() => {
          resolve('deleted');
        });
      } else {
        reject(Error('Not admin'));
      }
    });
  });

  return promise;
};

module.exports = deleteUserHandler;
