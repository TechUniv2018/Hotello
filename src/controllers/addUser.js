const JWT = require('jsonwebtoken');
const Models = require('../../models');
const constants = require('../constants.json');

function addUser(token, payload) {
  const decodedToken = JWT.decode(token, constants.JWT_SECRET);
  const promise = new Promise((resolve, reject) => {
    Models.users.find({
      where: {
        email: decodedToken.email,
      },
    }).then((user) => {
      if (user.dataValues.role === 'admin') {
        const {
          firstName, lastName, password, email, role, phoneNumber,
        } = payload;
        Models.users.create({
          firstName, lastName, password, email, role, phoneNumber,
        }).then(() => {
          resolve({ userDetails: { firstName, lastName, email }, msg: 'User added' });
        });
      } else {
        reject(Error('Not admin'));
      }
    });
  });
  return promise;
}

module.exports = addUser;
