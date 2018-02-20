const JWT = require('jsonwebtoken');
const Models = require('../../models');


const suspendUserHandler = (token, payload) => {
  const decodedToken = JWT.decode(token, 'RandomSecretString');
  Models.users.update(
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
