const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');
const Models = require('../../models');


describe('Testing cancel booking route ', () => {
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
    const expectedString = 'PNR not found';
    fetch.mockResponse(expectedString);
    const invalidPnr = 'invalidPnr';
    const options = {
      method: 'GET',
      url: `/adminCancelBooking/${invalidPnr}`,
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
