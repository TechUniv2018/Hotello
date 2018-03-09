const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
// const fetch = require('node-fetch');
// const Models = require('../../models');
const payloadForBooking = require('../../payloadForBooking');


describe('Testing bookHotel route ', () => {
  beforeAll((done) => {
    setTimeout(() => done(), 3000);
  });
  test('sdasjkb', (done) => {
    console.log(jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'sampleuser@gmail.com',
    }, constants.JWT_SECRET));
    const options = {
      method: 'POST',
      url: '/bookHotel',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
      payload: payloadForBooking,
    };
    server.inject(options, (response) => {
      console.log(response.result);
      expect(response.result).not.toBe(null);
      done();
    });
  });
});
