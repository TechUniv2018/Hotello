const JWT = require('jsonwebtoken');

module.exports = (authorization) => {
  console.log('The jwt token is: ', authorization);
  const decodedToken = JWT.decode(authorization, 'NeverShareYourSecret');
  decodedToken.exp = Math.floor(Date.now() / 1000);
  return (JWT.sign(decodedToken, 'NeverShareYourSecret'));
};
