const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const Models = require('../../models');
const constants = require('../../src/constants.json');
const saveBooking = require('../../src/controllers/saveBooking');
const fetch = require('node-fetch');

fetch.mockResponse(JSON.stringify({
  auditData: {
    processTime: '1499',
    timestamp: '2018-02-23 06:37:12.116',
    requestHost: '156.107.90.74',
    serverId: 'sa37AUX3ROLBLIS.env#PL',
    environment: '[int]',
    release: '35864bfd0f9d0415be7f627c8dd70ec3cd275698',
    token: '4b3c2f5e-3b6e-4de6-9dbd-f695191bc3e4',
    internal: '0|41A1E8B8C11449FF8E1274ED942E88F80636|UK|06|1|24|||||||||||R|25|1|1~1~2~0|0|0||0|unm95u7zree2vf9jjcev4ecv|||',
  },
  booking: {
    reference: '1-3777879',
    clientReference: 'INTEGRATIONAGENCY',
    creationDate: '2018-02-23',
    status: 'CONFIRMED',
    modificationPolicies: {
      cancellation: true,
      modification: true,
    },
    creationUser: 'unm95u7zree2vf9jjcev4ecv',
    holder: {
      name: 'HOLDERFIRSTNAME',
      surname: 'HOLDERLASTNAME',
    },
    hotel: {
      checkOut: '2018-03-16',
      checkIn: '2018-03-15',
      code: 1070,
      name: 'Armadams',
      categoryCode: '4EST',
      categoryName: '4 STARS',
      destinationCode: 'PMI',
      destinationName: 'Majorca',
      zoneCode: 10,
      zoneName: 'Palma',
      latitude: '39.568861',
      longitude: '2.630294',
      rooms: [
        {
          status: 'CONFIRMED',
          id: 1,
          code: 'DBT.ST',
          name: 'Double or Twin STANDARD',
          paxes: [
            {
              roomId: 1,
              type: 'AD',
              name: 'Second Adult Name',
              surname: 'Surname',
            },
            {
              roomId: 1,
              type: 'AD',
              name: 'First Adult Name',
              surname: 'Surname',
            },
          ],
          rates: [
            {
              rateClass: 'NOR',
              net: '92.29',
              rateComments: '1x Double or Twin Estimated total amount of taxes & fees for this booking: 6.60 Euro   payable on arrival  \r. Car park YES (with additional debit notes) 8 EUR Per unit/night. . Information for those bookings with half board: The dinner will be served in a restaurant close to the hotel.',
              paymentType: 'AT_WEB',
              packaging: false,
              boardCode: 'RO',
              boardName: 'ROOM ONLY',
              cancellationPolicies: [
                {
                  amount: '92.29',
                  from: '2018-03-12T23:59:00+01:00',
                },
              ],
              taxes: {
                taxes: [
                  {
                    included: false,
                    amount: '6.60',
                    currency: 'EUR',
                  },
                ],
                allIncluded: false,
              },
              rooms: 1,
              adults: 2,
              children: 0,
            },
          ],
        },
      ],
      totalNet: '92.29',
      currency: 'EUR',
      supplier: {
        name: 'HOTELBEDS PRODUCT,S.L.U.',
        vatNumber: 'ESB38877676',
      },
    },
    remark: 'Booking remarks are to be written here.',
    totalNet: 92.29,
    pendingAmount: 92.29,
    currency: 'EUR',
  },
}));

// jest.setTimeout(10000);
describe('Testing the make booking route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
    Models.bookings.destroy({ truncate: true }).then(() => done());
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
    Models.bookings.destroy({ truncate: true }).then(() => done());
  });
  beforeEach((done) => {
    Models.users.create({
      firstName: 'Nidhi',
      lastName: 'Seth',
      email: 'admin@hotello.com',
      password: 'Hotello@12',
      role: 'admin',
      phoneNumber: 999999999,
    }).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  it('returns the response for booking', (done) => {
    const options = {
      method: 'POST',
      url: '/bookHotel',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, constants.JWT_SECRET),
      },
      payload: {
        rooms: [{
          rateKey: constants.RATE_KEY,
          paxes: [{
            roomId: '1',
            type: 'AD',
            name: 'First Adult Name',
            surname: 'Surname',
          },
          ],
        }],
      },
    };
    server.inject(options, (response) => {
      const resJson = JSON.parse(response.payload);
      expect(resJson.status).toEqual('CONFIRMED');
      done();
    });
  });
  it('adds the booking details to the db', (done) => {
    const Authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, constants.JWT_SECRET);
    const booking = constants.BOOKING;
    const promise = saveBooking(Authorization, booking);
    promise.then(() => {
      Models.bookings.find({
        where: {
          bookingid: booking.reference,
        },
      }).then((dbBooking) => {
        console.log(dbBooking);
        expect(dbBooking.bookingid).toEqual(booking.reference);
        done();
      });
    });
  });
});
