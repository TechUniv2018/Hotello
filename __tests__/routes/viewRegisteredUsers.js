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
    },
    {
      email: 'kukkal@gmail.com',
      firstName: 'Ajay',
      lastName: 'Singh',
      password: 'P@$$w0rd',
      role: 'publicUser',
      phoneNumber: '7823298390',
    },
    {
      email: 'blob@gmail.com',
      firstName: 'blob',
      lastName: 'blobby',
      password: 'P@$$w0rd',
      role: 'publicUser',
      phoneNumber: '7823298390',
    },
    {
      email: 'glob@gmail.com',
      firstName: 'glob',
      lastName: 'globby',
      password: 'P@$$w0rd',
      role: 'publicUser',
      phoneNumber: '7823298390',
    },
    ]).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });

  it('Checking for response from the viewRegisteredusers route', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, 'RandomSecretString');
    const options = {
      method: 'GET',
      url: '/viewRegisteredUser',
      headers: {
        Authorization: authorization,
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  // it('should return an error when anyone other than admin tries to use route', (done) => {
  //   const authorization = jwt.sign({
  //     exp: Math.floor(Date.now() / 1000) + (60 * 60),
  //     email: 'publicUser@hotello.com',
  //   }, 'RandomSecretString');
  //   const toAdd = {
  //     email: 'kukkal@gmail.com',
  //     firstName: 'Ajay',
  //     lastName: 'Singh',
  //     password: 'P@$$w0rd',
  //     role: 'publicUser',
  //     phoneNumber: '7823298390',
  //   };
  //   const options = {
  //     method: 'POST',
  //     url: '/addUser',
  //     headers: {
  //       Authorization: authorization,
  //     },
  //     payload: toAdd,
  //   };
  //   server.inject(options, (response) => {
  //     expect(response.result).toBe('Not admin');
  //     done();
  //   });
  // });
});
