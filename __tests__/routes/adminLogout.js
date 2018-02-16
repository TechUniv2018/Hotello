const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const Models = require('../../models');

describe('Testing the logout route', () => {
  beforeEach((done) => {
    Models.users.create({
      email: 'admin@hotello.com',
      password: 'Hotello@12',
    }).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true });
    done();
  });
  it('Checking if the logout route exists', (done) => {
    const options = {
      method: 'POST',
      url: '/logout',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, 'NeverShareYourSecret'),
      },
    };
    server.inject(options, (response) => {
      expect(response).not.toBe(null);
      done();
    });
  });
  it('Checking if JWT token is expired', (done) => {
    const requestToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, 'NeverShareYourSecret');
    const options = {
      method: 'POST',
      url: '/logout',
      headers: {
        Authorization: requestToken,
      },
    };
    server.inject(options, (response) => {
      const decodedToken = jwt.decode(response.payload, 'NeverShareYourSecret');
      expect(decodedToken.exp).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
      done();
    });
  });
});
