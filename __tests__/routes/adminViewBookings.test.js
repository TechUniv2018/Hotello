const Server = require('../../src/server');
const Models = require('../../models');
const JWT = require('jsonwebtoken');

describe('Test server for GET /adminViewBookings: ', () => {
  beforeAll((done) => {
    Models.bookings.destroy({ truncate: true }).then(() => done());
  });
  afterAll((done) => {
    Models.bookings.destroy({ truncate: true }).then(() => done());
  });
  test('Should return statusCode 200: ', (done) => {
    const options = {
      url: '/adminViewBookings',
      method: 'GET',
      headers: {
        Authorization: JWT.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, 'RandomSecretString'),
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
