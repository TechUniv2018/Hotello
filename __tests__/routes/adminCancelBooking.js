const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');
const Models = require('../../models');


describe('Testing getBookingStatus route ', () => {
  beforeAll((done) => {
    Models.bookings.create({
      bookingid: 'validPnr',
      email: 'jaysingh@gmail.com',
      bookingdate: '2018-02-15',
      amount: 1720.00,
      hotelname: 'Royal Orchid',
      checkin: '2018-02-20',
      checkout: '2018-02-25',
      numofguests: 2,
      numofrooms: 1,
      city: 'Bangalore',
      status: 'confirmed',
    }).then(() => done());
  });
  afterAll((done) => {
    Models.bookings.destroy({ truncate: true }).then(() => done());
  });

  it('Testing for valid pnr', (done) => {
    const expectedObj =
    {
      status: 'OK',
      result: { reservationState: 'CANCELLED' },
      process_time: 2.0507080554962,
      mode: 'TEST',
    };
    fetch.mockResponse(JSON.stringify(expectedObj));
    const validPnr = 'validPnr';
    const options = {
      method: 'GET',
      url: `/adminCancelBooking/${validPnr}`,
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      console.log(response.payload);
      expect(response.payload).toBe('Cancelled');
      done();
    });
  });
  it('Testing for invalid pnr', (done) => {
    const expectedObj = 'PNR not found';
    fetch.mockResponse(JSON.stringify(expectedObj));
    const validPnr = 'invalidPnr';
    const options = {
      method: 'GET',
      url: `/adminCancelBooking/${validPnr}`,
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      console.log(response.payload);
      expect(response.payload).toBe('Error');
      done();
    });
  });
});


//   it('Testing for request with proper hotel id, checking if response is booking status object', (done) => {
//     const options = {
//       method: 'GET',
//       url: '/getBookingStatus/5778955',
//       headers: {
//         Authorization: jwt.sign({
//           exp: Math.floor(Date.now() / 1000) + (60 * 60),
//           email: 'sampleuser@gmail.com',
//         }, constants.JWT_SECRET),
//       },
//     };
//     server.inject(options, (response) => {
//       console.log(response.payload);
//       expect(JSON.parse(response.payload)).toEqual(expectedObj);
//       done();
//     });
//   });
// });
