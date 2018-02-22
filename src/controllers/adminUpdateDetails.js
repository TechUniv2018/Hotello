const JWT = require('jsonwebtoken');
const Models = require('../../models');

const adminUpdateDetailsHandler = (authorization, payload) => {
  const decodedToken = JWT.decode(authorization, 'RandomSecretString');
  const requesterEmail = decodedToken.email;
  return Models.users.findOne({ where: { email: requesterEmail } }).then((value) => {
    if (value !== null) {
      if (value.dataValues.role === 'admin') {
        const { email, ...updateObj } = payload;
        return Models.users.update(payload, { where: { email: payload.email }, returning: true })
          .then((resultArray) => {
            if (resultArray[0] === 0) { return 'User not found'; }
            return resultArray[1][0];
          });
      }
    }

    return 'No such admin found';
  });
};
module.exports = adminUpdateDetailsHandler;
