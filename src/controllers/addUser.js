const JWT = require('jsonwebtoken');
const Models = require('../../models');

function addUser(token, payload) {
  const decodedToken = JWT.decode(token, 'RandomSecretString');
  const promise = new Promise((resolve, reject) => {
    Models.users.find({
      where: {
        email: decodedToken.email,
      },
    }).then((user) => {
      if (user.dataValues.role === 'admin') {
        const {
          firstName, lastName, password, email, role, phoneNumber
        } = payload;
        Models.users.create({
          firstName, lastName, password, email, role, phoneNumber
        }).then((userDetails) => {
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

