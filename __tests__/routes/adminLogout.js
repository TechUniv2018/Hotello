const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const Models = require('../../models');

jest.setTimeout(10000);
describe('Testing the logout route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  beforeEach((done) => {
    Models.users.create({
      email: 'admin2@hotello.com',
      password: 'Hotello@12',
    }).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  it('Checking if the logout route exists', (done) => {
    const options = {
      method: 'POST',
      url: '/logout',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin2@hotello.com',
        }, 'RandomSecretString'),
      },
    };
    server.inject(options, (response) => {
      expect(response).not.toBe(null);
      done();
    });
  }, 100000);
  it('Checking if JWT token is expired', (done) => {
    const requestToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin2@hotello.com',
    }, 'RandomSecretString');
    const options = {
      method: 'POST',
      url: '/logout',
      headers: {
        Authorization: requestToken,
      },
    };
    server.inject(options, (response) => {
      const decodedToken = jwt.decode(response.payload, 'RandomSecretString');
      expect(decodedToken.exp).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
      done();
    });
  }, 100000);
});
