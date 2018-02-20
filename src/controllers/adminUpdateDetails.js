const JWT = require('jsonwebtoken');
const Models = require('../../models');

const adminUpdateDetailsHandler = (authorization) => {
  const decodedToken = JWT.decode(authorization, 'RandomSecretString');
  const requesterEmail = decodedToken.email;
  return Models.users.findOne({ where: { email: requesterEmail } }).then((value) => {
    if (value !== null) {
      if (value.dataValues.role === 'admin') { return 'Admin found'; }
    }

    return 'No such admin found';
  });
};
module.exports = adminUpdateDetailsHandler;
