const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');


fetch.mockResponse(JSON.stringify({
  auditData: {
    processTime: '50',
    timestamp: '2018-02-22 05:41:59.513',
    requestHost: '10.222.62.37',
    serverId: 'sa37AUX3ROLBLIS.env',
    environment: '[int]',
    release: '876e7f4103b252c0666b4ba9f1a1f3e22a261411',
  },
  hotel: {
    code: 1,
    name: {
      content: 'Ohtels Villa Dorada',
    },
    description: {
      content: 'This hotel is located about 150 metres from the fine sandy beach. The lively centre of Cambrils is approximately 10 km away and can be easily reached by the public bus services. There is a stop for public transport right in front of the hotel. The immediate vicinity offers a diverse range of shopping and entertainment facilities including boutiques, restaurants and bars. This hotel comprises a total of 260 rooms spread over 5 floors. Dining options include a café, a bar and an air-conditioned buffet restaurant with highchairs for infants. The tastefully decorated, cosy rooms come with a balcony and satellite TV.',
    },
    country: {
      code: 'ES',
      isoCode: 'ES',
      description: {
        content: 'Spain',
      },
    },
    destination: {
      code: 'SAL',
      name: {
        content: 'Salou Area / Costa Dorada',
      },
      countryCode: 'ES',
    },
    address: {
      content: 'VENDRELL,11  ',
    },
    postalCode: '43840',
    city: {
      content: 'SALOU',
    },
    email: 'comercial@ohtels.es',
    rooms: [
      {
        roomCode: 'DBT.ST-2',
        description: 'Double or Twin STANDARD',
        type: {
          code: 'DBT',
          description: {
            content: 'Double or Twin',
          },
        },
        characteristic: {
          code: 'ST-2',
          description: {
            content: 'STANDARD',
          },
        },
        roomFacilities: [
          {
            facilityCode: 220,
            facilityGroupCode: 60,
            description: {
              content: 'Living room',
            },
            number: 0,
            indYesOrNo: true,
          },
        ],
        roomStays: [
          {
            stayType: 'BED',
            order: '1',
            description: 'Bed room',
          },
        ],
      },
    ],
  },
}));


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
      expect(Object.keys(JSON.parse(response.payload))).toContain('country');
      expect(Object.keys(JSON.parse(response.payload))).toContain('address');
      done();
    });
  });
});
