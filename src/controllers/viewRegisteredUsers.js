const Models = require('../../models');
const JWT = require('jsonwebtoken');

function getRegisteredUsers(token) {
  const decodedToken = JWT.decode(token, 'RandomSecretString');
  console.log('inside getRegUsesr');
  const promise = new Promise((resolve, reject) => {
    Models.users.find({
      where: {
        email: decodedToken.email,
      },
    }).then((user) => {
      if (user.dataValues.role === 'admin') {
        Models.users.findAll({
          where: {
            role: 'publicUser',
          },
        }).then((usersRecords) => {
          resolve({ usersRecords });
        });
      } else {
        reject(Error('Not admin'));
      }
    });
  });
  return promise;
}

module.exports = getRegisteredUsers;

