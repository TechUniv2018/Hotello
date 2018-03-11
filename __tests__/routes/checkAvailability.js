const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');
const mockResponses = require('../../src/mockResponses');

const validPayload = {
  cityName: 'Mumbai',
  rooms: [
    {
      ADT: 2,
      CHD: 1,
    },
    {
      ADT: 1,
    },
  ],
  checkIn: '2018-03-29',
  checkOut: '2018-03-30',
  nationality: 'IN',
};

const invalidPayload = {
  cityName: 'Bhubaneshwar',
  rooms: [
    {
      ADT: 2,
    },
    {
      ADT: 1,
      CHD: 1,
    },
  ],
  checkIn: '2018-03-29',
  checkOut: '2018-03-30',

};

const expectedObj = mockResponses.checkAvailabilityResponse;

fetch.mockResponse(JSON.stringify(expectedObj));
describe('Testing the checkAvailability route', () => {
  beforeAll((done) => {
    setTimeout(() => { done(); }, 0);
    // done();
  });
  afterAll((done) => {
    done();
  });


  it('Testing for request with invalid payload, should return error 400', (done) => {
    // fetch.mockResponse(JSON.stringify({ access_token: '12345' }));
    const options = {
      method: 'POST',
      url: '/checkAvailability',
      headers: {
        cookie: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
      payload: invalidPayload,
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });


  it('Testing for request with valid payload, should return code 200', (done) => {
    // fetch.mockResponse(JSON.stringify({ access_token: '12345' }));
    const options = {
      method: 'POST',
      url: '/checkAvailability',
      headers: {
        sessionId: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
      payload: validPayload,
    };
    server.inject(options, (response) => {
      console.log(response.payload);
      expect(JSON.parse(response.payload)).toEqual(expectedObj);
      done();
    });
  }, 25000);
});
