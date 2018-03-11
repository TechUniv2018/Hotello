const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');
const mockResponses = require('../../src/mockResponses');

const expectedObj = mockResponses.viewHotelDetailsResponse;
fetch.mockResponse(JSON.stringify(expectedObj));


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
        sessionId: 'testcookie',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });


  it('Testing for request with proper hotel id, checking if response is hotel details object', (done) => {
    const options = {
      method: 'GET',
      url: '/viewHotelDetails/13425',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
        sessionId: 'testcookie',
      },
    };
    server.inject(options, (response) => {
      console.log(response.payload);
      expect(JSON.parse(response.payload)).toEqual(expectedObj);
      done();
    });
  });
});
