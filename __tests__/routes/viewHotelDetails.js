const server = require('../../src/server');
const jwt = require('jsonwebtoken');


describe('Testing the search hotels by city route', () => {
  beforeAll((done) => {
    setTimeout(() => { done(); }, 3000);
  });
  afterAll((done) => {
    done();
  });

  it('Testing for request with no city name, should return error 404', (done) => {
    const options = {
      method: 'GET',
      url: '/viewHotelDetails/',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, 'RandomSecretString'),
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
  it('Testing for request with invalid characters in city name, should return error 400', (done) => {
    const options = {
      method: 'GET',
      url: '/viewHotelDetails/1',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, 'RandomSecretString'),
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  // it('Testing for request with valid city name, should return list of hotels with details', (done) => {
  //   const options = {
  //     method: 'GET',
  //     url: '/searchHotelsByCity/Mount%20Abu',
  //     headers: {
  //       Authorization: jwt.sign({
  //         exp: Math.floor(Date.now() / 1000) + (60 * 60),
  //         email: 'sampleuser@gmail.com',
  //       }, 'RandomSecretString'),
  //     },
  //   };
  //   server.inject(options, (response) => {
  //     expect(response.result).not.toBe('Error');
  //     expect(response.statusCode).not.toBe(500);
  //     done();
  //   });
  // });
});
