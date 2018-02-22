const Hapi = require('hapi');
const Routes = require('./routes');
const constants = require('./constants.json');

const server = new Hapi.Server();

const validate = (decoded, request, callback) => {
  // do checks to see if the person is valid
  if (decoded.email) {
    return callback(null, true);
  }

  return callback(null, false);
};
server.connection({
  host: 'localhost',
  port: 4000,
});


server.register(require('hapi-auth-jwt2'), (err) => {
  if (err) {
    console.log(err);
  }

  server.auth.strategy(
    'jwt', 'jwt',
    {
      key: constants.JWT_SECRET,
      validateFunc: validate,
      verifyOptions: { algorithms: ['HS256'] },
    },
  );

  server.auth.default('jwt');
  server.route(Routes);
});

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server created at: ', server.info.uri);
  });
}

module.exports = server;
