const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');

jest.setTimeout(10000);
describe('Testing the add user details route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  beforeEach((done) => {
    Models.users.bulkCreate([{
      email: 'admin@hotello.com',
      password: 'Hotello@12',
      role: 'admin',
    },
    {
      email: 'publicUser@hotello.com',
      password: 'PublicUser@1234',
      role: 'publicUser',
    }]).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });

  it('Checking for response from the addUser route', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, 'RandomSecretString');
    const toAdd = {
      email: 'kukkal@gmail.com',
      firstName: 'Ajay',
      lastName: 'Singh',
      password: 'P@$$w0rd',
      role: 'admin',
      phoneNumber: '7823298390',
    };
    const options = {
      method: 'POST',
      url: '/addUser',
      headers: {
        Authorization: authorization,
      },
      payload: toAdd,
    };
    server.inject(options, (response) => {
      expect(response.result.msg).toBe('User added');
      done();
    });
  });
  it('should return an error when anyone other than admin tries to use route', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'publicUser@hotello.com',
    }, 'RandomSecretString');
    const toAdd = {
      email: 'kukkal@gmail.com',
      firstName: 'Ajay',
      lastName: 'Singh',
      password: 'P@$$w0rd',
      role: 'publicUser',
      phoneNumber: '7823298390',
    };
    const options = {
      method: 'POST',
      url: '/addUser',
      headers: {
        Authorization: authorization,
      },
      payload: toAdd,
    };
    server.inject(options, (response) => {
      expect(response.result).toBe('Not admin');
      done();
    });
  });

  // it('Checking if the suspend column has been made true for the respective user', (done) => {
  //   const authorization = jwt.sign({
  //     exp: Math.floor(Date.now() / 1000) + (60 * 60),
  //     email: 'admin@hotello.com',
  //   }, 'RandomSecretString');
  //   const options = {
  //     method: 'PUT',
  //     url: '/suspendUser',
  //     headers: {
  //       Authorization: authorization,
  //     },
  //     payload: {
  //       email: 'publicUser@hotello.com',
  //     },
  //   };
  //   server.inject(options, (response) => {
  //     Models.users.find({
  //       where: {
  //         email: options.payload.email,
  //       },
  //     }).then((user) => {
  //       expect(user.suspended).toBe(true);
  //       done();
  //     });
  //   });
  // });
});