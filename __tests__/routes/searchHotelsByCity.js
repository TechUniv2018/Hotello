const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');

fetch.mockResponse(JSON.stringify({
  from: 1,
  to: 100,
  total: 49,
  auditData: {
    processTime: '171',
    timestamp: '2018-02-23 04:01:11.534',
    requestHost: '10.222.62.39',
    serverId: 'sa37AUX3ROLBLIS.env',
    environment: '[int]',
    release: '876e7f4103b252c0666b4ba9f1a1f3e22a261411',
  },
  hotels: [{
    code: 619562,
    name: {
      content: 'Four Points by Sheraton Agra',
    },
    description: {
      content: 'This lovely $hotel. getTypeHotel() is located in Agra. ',
    },
    countryCode: 'IN',
    destinationCode: 'AGR',
    zoneCode: 1,
    categoryCode: '4EST',
    categoryGroupCode: 'GRUPO4',
    chainCode: 'STARW',
    accommodationTypeCode: 'HOTEL',
    address: {
      content: 'C-1, C-2, TAJ NAGARI PHASE 1,  ',
    },
    postalCode: '282004',
    city: {
      content: 'AGRA',
    },
    phones: [
      {
        phoneNumber: '00915622333333',
        phoneType: 'PHONEHOTEL',
      },
      {
        phoneNumber: '00915622333333',
        phoneType: 'FAXNUMBER',
      },
    ],
  },
  ],
}));

describe('Testing the search hotels by city route', () => {
  beforeAll((done) => {
    done();
  });
  afterAll((done) => {
    done();
  });

  it('Testing for request with no city name, should return error 404', (done) => {
    const options = {
      method: 'GET',
      url: '/searchHotelsByCity/',
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
  it('Testing for request with invalid characters in city name, should return error 400', (done) => {
    const options = {
      method: 'GET',
      url: '/searchHotelsByCity/$1asd',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  it('Testing for request with valid city name, should return list of hotels with details', (done) => {
    const options = {
      method: 'GET',
      url: '/searchHotelsByCity/Bangalore',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      // console.log(response);
      expect(response.result).not.toBe('Error');
      expect(response.statusCode).not.toBe(500);
      done();
    });
  }, 10000);
});
