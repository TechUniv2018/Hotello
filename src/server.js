const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const HapiJWTAuth = require('hapi-auth-jwt2');
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
  port: 8000,
});

// const a = [{
//   register: require('hapi-auth-jwt2'),
// },
// {
//   register: Inert,
// },
// {
//   register: Vision,
//   options: {

//   }
// }];

const options = {
  info: {
    title: 'Hotello API Documentation',
    version: '1.0.0',
  },
};

server.register(
  [
    HapiJWTAuth,
    Inert,
    Vision,
    {
      register: HapiSwagger,
      options,
    }],
  (err) => {
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
  },
);

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server created at: ', server.info.uri);
  });
}

module.exports = server;
