const Hapi = require('hapi');

const people = { // our "users database"
  1: {
    id: 1,
    name: 'Jen Jones',
  },
};

// bring your own validation function
const validate = function (decoded, request, callback) {
  // do your checks to see if the person is valid
  // if (!people[decoded.id]) {
  //   return callback(null, false);
  // }

  return callback(null, true);
};

const server = new Hapi.Server();
server.connection({
  port: 8000,
  host: 'localhost',
});
// include our module here ↓↓
server.register(require('hapi-auth-jwt2'), (err) => {
  if (err) {
    console.log(err);
  }

  server.auth.strategy(
    'jwt', 'jwt',
    {
      key: constants.JWT_SECRET, // Never Share your secret key
      validateFunc: validate, // validate function defined above
      verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
    },
  );

  server.auth.default('jwt');

  server.route([
    {
      method: 'GET',
      path: '/',
      config: { auth: false },
      handler(request, reply) {
        reply({ text: 'Token not required' });
      },
    },
    {
      method: 'POST',
      path: '/restricted',
      config: { auth: 'jwt' },
      handler(request, reply) {
        reply({ text: 'You used a Token!' })
          .header('Authorization', request.headers.authorization);
      },
    },
  ]);
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});
