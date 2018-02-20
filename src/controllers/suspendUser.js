const JWT = require('jsonwebtoken');
const Models = require('../../models');


const suspendUserHandler = (token, payload) => {
  const decodedToken = JWT.decode(token, 'RandomSecretString');
  return Models.users.update(
    {
      suspended: true,
    },
    {
      where: {
        email: payload.email,
      },
    },
  );
};

module.exports = suspendUserHandler;
