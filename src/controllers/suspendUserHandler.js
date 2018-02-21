const JWT = require('jsonwebtoken');
const Models = require('../../models');


const suspendUserHandler = (token, payload) => {
  const decodedToken = JWT.decode(token, 'RandomSecretString');
  const promise = new Promise((resolve, reject) => {
    Models.users.find({
      where: {
        email: decodedToken.email,
      },
    }).then((user) => {
      if (user.dataValues.role === 'admin') {
        Models.users.update(
          {
            suspended: true,
          },
          {
            where: {
              email: payload.email,
            },
          },
        ).then(() => {
          resolve('suspended');
        });
      } else {
        reject(Error('Not admin'));
      }
    });
  });

  return promise;
};

module.exports = suspendUserHandler;