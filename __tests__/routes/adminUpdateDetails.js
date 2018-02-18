const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');
const updateHandler = require('../../src/controllers/adminUpdateDetails');

describe('Testing the update admin details route', () => {
  beforeEach((done) => {
    Models.users.create({
      firstName: 'Nidhi',
      lastName: 'Seth',
      email: 'admin@hotello.com',
      password: 'Hotello@12',
      role: 'admin',
      phoneNumber: 999999999,
    }).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true });
    done();
  });
  it('returns user details for the update form', (done) => {
    const options = {
      method: 'GET',
      url: '/adminDetails',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, 'NeverShareYourSecret'),
      },
    };
    server.inject(options, (response) => {
      expect(response.result).toEqual({
        firstName: 'Nidhi',
        lastName: 'Seth',
        email: 'admin@hotello.com',
        phoneNumber: '999999999',
      });
      done();
    });
  }, 10000);

  it('user details for the given email', () => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, 'NeverShareYourSecret');
    const updateDetailsPromise = updateHandler(authorization);
    updateDetailsPromise.then((userDetails) => {
      expect(userDetails).toEqual({
        firstName: 'Nidhi',
        lastName: 'Seth',
        email: 'admin@hotello.com',
        phoneNumber: '999999999',
      });
    });
  }, 10000);
});

