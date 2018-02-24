const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');


const validPayload = {
  checkIn: '2018-03-15',
  checkOut: '2018-03-16',
  rooms: 1,
  adults: 2,
  children: 0,
  hotels: [1067,
    182125,
    187939,
    212167,
    215417],
};

const invalidPayload = {
  checkIn: 2018,
  checkOut: '2018-03-16',
  rooms: 1,
  adults: 2,
  children: 0,
  hotels: [1067,
    182125,
    187939,
    212167,
    215417],
};

const paxPayload = {
  checkIn: '2018-03-15',
  checkOut: '2018-03-16',
  rooms: 1,
  adults: 2,
  children: 1,
  childrenAges: [10],
  hotels: [1067,
    182125,
    187939,
    212167,
    215417],
};

const invalidPaxPayload = {
  checkIn: '2018-03-15',
  checkOut: '2018-03-16',
  rooms: 1,
  adults: 2,
  children: 1,
  hotels: [1067,
    182125,
    187939,
    212167,
    215417],
};

fetch.mockResponse(JSON.stringify({
  auditData: {
    processTime: '21',
    timestamp: '2018-02-23 03:26:47.135',
    requestHost: '42.111.204.120',
    serverId: 'sa37AUX3ROLBLIS.env#PL',
    environment: '[int]',
    release: '35864bfd0f9d0415be7f627c8dd70ec3cd275698',
    token: '4e0e29d5-cd83-4f5b-b23d-cb66104b69df',
    internal: '0||UK|05|0|0||||||||||||0||1~1~2~0|0|0||0|unm95u7zree2vf9jjcev4ecv|||',
  },
  hotels: {
    total: 0,
  },
}));
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
        Authorization: jwt.sign({
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

  it('Testing for request with invalid pax payload, should return error 400', (done) => {
    // fetch.mockResponse(JSON.stringify({ access_token: '12345' }));
    const options = {
      method: 'POST',
      url: '/checkAvailability',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
      payload: invalidPaxPayload,
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
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
      payload: validPayload,
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('Testing for request with valid pax payload, should return code 200', (done) => {
    // fetch.mockResponse(JSON.stringify({ access_token: '12345' }));
    const options = {
      method: 'POST',
      url: '/checkAvailability',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
      payload: paxPayload,
    };

    server.inject(options, (response) => {
      console.log('Mocked response is: ', response.payload);

      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
