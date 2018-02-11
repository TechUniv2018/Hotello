const Hapi = require('hapi');
const Routes = require('./routes/index.js');


const server = new Hapi.Server();


server.connection({
  host: 'localhost',
  port: Number(5500),
});
server.route(Routes);
server.start((err) => { if (err) console.log(err); });
// module.exports = server;
