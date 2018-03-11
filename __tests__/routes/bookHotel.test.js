const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');
const mockResponses = require('../../src/mockResponses');
const payloadForBooking = require('../../payloadForBooking');


const expectedObj = mockResponses.bookHotelResponse;
fetch.mockResponse(JSON.stringify(expectedObj));

describe('Testing bookHotel route ', () => {
  beforeAll((done) => {
    setTimeout(() => done(), 3000);
  });
  test('Testing for booking with correct parameters', (done) => {
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
        sessionId: 'testcookie',
      },
      payload: payloadForBooking,
    };
    server.inject(options, (response) => {
      console.log(response.result);
      expect(response.result.pnr).not.toBe(null);
      done();
    });
  });
});
