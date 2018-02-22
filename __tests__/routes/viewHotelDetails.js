const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');

describe('Testing viewHotelDetails route ', () => {
  beforeAll((done) => {
    setTimeout(() => { done(); }, 3000);
  });
  afterAll((done) => {
    done();
  });

  it('Testing for request with no hotel ID, should return error 404', (done) => {
    const options = {
      method: 'GET',
      url: '/viewHotelDetails/',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
  it('Testing for request proper hotel id, should return error 200', (done) => {
    const options = {
      method: 'GET',
      url: '/viewHotelDetails/1',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it('Testing for request with proper hotel id, checking if response is hotel details object', (done) => {
    const options = {
      method: 'GET',
      url: '/viewHotelDetails/1',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      // console.log(JSON.parse(response.payload));
      expect(Object.keys(JSON.parse(response.payload))).toContain('rooms');
      expect(Object.keys(JSON.parse(response.payload))).toContain('images');
      expect(Object.keys(JSON.parse(response.payload))).toContain('facilities');
      done();
    });
  });
});
