const fetch = require('node-fetch');
const checkAvailabilityHandler = require('../../src/controllers/checkAvailabilityHandler');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');

const testPayload = {
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
  nationality: 'IN',
};

const expectedObj = {
  hotelResultSet: [
    {
      thumbnail: '',
      chain_name: '',
      max_rate_in_preferred_currencies: [],
      hotel_id: '3117526',
      distance: 2.3,
      max_rate: {
        amount: 130.7173,
        currency: 'USD',
      },
      longitude: '85.850000',
      hotel_name: 'Mango Hotels Prangan',
      min_rate_in_preferred_currencies: [],
      min_rate: {
        amount: 130.7173,
        currency: 'USD',
      },
      latitude: '20.271320',
      stars: '3',
    },
  ],
};

fetch.mockResponse(JSON.stringify(expectedObj));

describe('Testing the search hotels by city route', () => {
  beforeAll((done) => {
    done();
  });
  afterAll((done) => {
    done();
  });

  it('Testing the checkAvailability handler function', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'publicUser@hotello.com',
    }, constants.JWT_SECRET);

    checkAvailabilityHandler(authorization, testPayload)
      .then((response) => {
        console.log('response is: ', response);
        expect(JSON.parse(response)).toEqual(expectedObj);

        expect(response).not.toBe('Error');
        done();
      });
  }, 25000);
});
