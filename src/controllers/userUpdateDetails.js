const JWT = require('jsonwebtoken');
const Models = require('../../models');

const updateHandlerForGet = (authorization) => {
  const decodedToken = JWT.decode(authorization, 'RandomSecretString');
  console.log(decodedToken.email,'###');
  const promise = new Promise((resolve) => {
    Models.users.find({
      where: {
        email: decodedToken.email,
      },
    }).then((user) => {
      const userDetails = {
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        email: user.dataValues.email,
        phoneNumber: user.dataValues.phoneNumber,
      };
      resolve(userDetails);
    });
  });
  return promise;
};

const updateHandlerForPut=(authorization,payload)=>{
  const decodedToken = JWT.decode(authorization, 'RandomSecretString');
  const promise = new Promise((resolve) => {
  Models.users.update(
    {
      firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
    },
    {
      where: {
        email: decodedToken.email,
      },
    },
  ).then(() => {
    resolve({
      statusCode: 200,
      message: 'user updated',
    });
  });
});
  return promise;
}
module.exports = {updateHandlerForGet,updateHandlerForPut};
