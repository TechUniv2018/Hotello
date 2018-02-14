const Hapi = require('hapi');
const Routes = require('./routes/index.js');
const Hapiauthjwt = require('hapi-auth-jwt2');
const Models = require('../models');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: Number(5500),
});

const validate = (decoded, request, callback) => {
  console.log(decoded);
  Models.users.find({ where: { username: decoded.name } }).then((data) => {
    if (data) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
};

server.register(Hapiauthjwt, (err) => {
  if (err) throw err;

  server.auth.strategy(
    'jwt', 'jwt',
    {
      key: 'NeverShareYourSecret', // Never Share your secret key
      validateFunc: validate, // validate function defined above
      verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
    },
  );

  server.auth.default('jwt');

  server.route(Routes);
});


server.start((err) => {
  if (err) console.log(err);
  console.log('Routes are ', Routes);
});
module.exports = server;
