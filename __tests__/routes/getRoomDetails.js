const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');

const expectedObj = {
  hotel_room_details: {
    price_in_preferred_currencies: [],
    rules: {
      cancellation: 'cancel latest by 2018-03-22',
      remarks: [],
    },
    includes: [],
    price: {
      total: 264.1023,
      charge: 264.1023,
    },
    charge_in_preferred_currencies: [],
  },
};
// fetch.mockResponse(JSON.stringify(expectedObj));


describe('Testing getRoomDetails route ', () => {
  beforeAll((done) => {
    setTimeout(() => { done(); }, 3000);
  });
  afterAll((done) => {
    done();
  });

  it('Testing for request with no hotel ID, should return error 404', (done) => {
    const options = {
      method: 'GET',
      url: '/getRoomDetails/',
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


  it('Testing for request with proper hotel id, checking if response is hotel details object', (done) => {
    const options = {
      method: 'GET',
      url: '/getRoomDetails/13535/e90018d-7559-4164-83aa-edd6200e18b7',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      console.log(response.payload);
      expect((response.payload)).toEqual(expectedObj);
      done();
    });
  });
});
