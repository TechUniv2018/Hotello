const JWT = require('jsonwebtoken');
const Models = require('../../models');
const constants = require('../constants.json');

const adminDetailsHandler = (authorization) => {
  const decodedToken = JWT.decode(authorization, constants.JWT_SECRET);
  const requesterEmail = decodedToken.email;
  //   console.log('A:', requesterEmail);
  return Models.users.findOne({ where: { email: requesterEmail } }).then((value) => {
    if (value !== null) {
      if (value.dataValues.role === 'admin') {
        // const { email } = payload;
        return Models.users.findOne({ where: { email: requesterEmail } })
          .then(resultArray =>
            //
            (resultArray));
      }
    }

    return 'No such admin found';
  });
};
module.exports = adminDetailsHandler;
