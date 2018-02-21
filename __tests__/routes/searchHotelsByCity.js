const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');
const searchHotelsByCityHandler = require('../../src/controllers/searchHotelsByCityHandler');

describe('Testing the search hotels by city route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true })
      .then(() => {
        done();
      });
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });

  it('Testing for request with no city name, should return error 404', (done) => {
    const options = {
      method: 'GET',
      url: '/searchHotelsByCity/',
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
      url: '/searchHotelsByCity/$1asd',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, 'RandomSecretString'),
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  //   it('Testing the searchHotelsByCity handler function', (done) => {
  //     searchHotelsByCityHandler('authtoken', 'Bangalore').then((response) => {
  //       expect(response).not.toBe('Error');
  //       done();
  //     });
  //   }, 10000);
  it('Testing for request with valid city name, should return Name OK', (done) => {
    const options = {
      method: 'GET',
      url: '/searchHotelsByCity/Bangalore',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, 'RandomSecretString'),
      },
    };
    server.inject(options, (response) => {
      expect(response.result).not.toBe('Error');
      done();
    });
  });
});
