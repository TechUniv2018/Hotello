const fetch = require('node-fetch');
const searchHotelsByCityHandler = require('../../src/controllers/searchHotelsByCityHandler');


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
  it('Testing the searchHotelsByCity handler function', (done) => {
    searchHotelsByCityHandler('authtoken', 'Bangalore').then((response) => {
      expect(response).not.toBe('Error');
      done();
    });
  }, 10000);
});
