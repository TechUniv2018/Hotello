const fetch = require('node-fetch');
const checkAvailabilityHandler = require('../../src/controllers/checkAvailabilityHandler');

const testPayload = {
  checkIn: '2018-03-12',
  checkOut: '2018-03-15',
  rooms: 1,
  adults: 1,
  children: 1,
  childrenAges: [10],
  hotels: [1067,
    182125,
    187939,
    212167,
    215417],
};

fetch.mockResponse(JSON.stringify({
  auditData: {
    processTime: '21',
    timestamp: '2018-02-23 03:26:47.135',
    requestHost: '42.111.204.120',
    serverId: 'sa37AUX3ROLBLIS.env#PL',
    environment: '[int]',
    release: '35864bfd0f9d0415be7f627c8dd70ec3cd275698',
    token: '4e0e29d5-cd83-4f5b-b23d-cb66104b69df',
    internal: '0||UK|05|0|0||||||||||||0||1~1~2~0|0|0||0|unm95u7zree2vf9jjcev4ecv|||',
  },
  hotels: {
    total: 0,
  },
}));

describe('Testing the search hotels by city route', () => {
  beforeAll((done) => {
    done();
  });
  afterAll((done) => {
    done();
  });

  it('Testing the checkAvailability handler function', (done) => {
    checkAvailabilityHandler(testPayload).then((response) => {
      console.log('response is: ', response.payload);


      expect(response).not.toBe('Error');
      done();
    });
  }, 10000);
});
