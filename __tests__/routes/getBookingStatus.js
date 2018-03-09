const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');

const expectedObj =
{
  reservationState: 'CONFIRMED',
};
// fetch.mockResponse(JSON.stringify(expectedObj));


describe('Testing getBookingStatus route ', () => {
  beforeAll((done) => {
    setTimeout(() => { done(); }, 3000);
  });
  afterAll((done) => {
    done();
  });

  it('Testing for request with no hotel ID, should return error 404', (done) => {
    const options = {
      method: 'GET',
      url: '/getBookingStatus/',
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


  it('Testing for request with proper pnr, checking if response is booking status object', (done) => {
    const options = {
      method: 'GET',
      url: '/getBookingStatus/2f41b259-7f30-4b4c-84be-41142e278394',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      console.log(response.payload);
      expect(JSON.parse(response.payload)).toEqual(expectedObj);
      done();
    });
  });
});
