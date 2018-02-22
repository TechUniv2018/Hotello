const server = require('../../src/server');
const jwt = require('jsonwebtoken');

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

describe('Testing the checkAvailability route', () => {
  beforeAll((done) => {
    setTimeout(() => { done(); }, 0);
    // done();
  });
  afterAll((done) => {
    done();
  });


  it('Testing for request with invalid payload, should return error 400', (done) => {
    const options = {
      method: 'POST',
      url: '/checkAvailability',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, 'RandomSecretString'),
      },
      payload: invalidPayload,
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it('Testing for request with invalid pax payload, should return error 400', (done) => {
    const options = {
      method: 'POST',
      url: '/checkAvailability',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, 'RandomSecretString'),
      },
      payload: invalidPaxPayload,
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it('Testing for request with valid payload, should return code 200', (done) => {
    const options = {
      method: 'POST',
      url: '/checkAvailability',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, 'RandomSecretString'),
      },
      payload: validPayload,
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('Testing for request with valid pax payload, should return code 200', (done) => {
    const options = {
      method: 'POST',
      url: '/checkAvailability',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, 'RandomSecretString'),
      },
      payload: paxPayload,
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
