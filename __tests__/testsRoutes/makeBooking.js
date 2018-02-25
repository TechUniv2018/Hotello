const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const Models = require('../../models');
const constants = require('../../src/constants.json');
const saveBooking = require('../../src/controllers/saveBooking');
const checkAvailabiltyHandler = require('../../src/controllers/checkAvailabilityHandler');

jest.setTimeout(10000);
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
      Models.bookings.destroy({ truncate: true }).then(() => done());
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  it('returns the response for booking', (done) => {
    const testPayload = {
      checkIn: '2018-03-12',
      checkOut: '2018-03-15',
      rooms: 1,
      adults: 1,
      children: 0,
      hotels: [1067,
        182125,
        187939,
        212167,
        215417],
    };
    checkAvailabiltyHandler(testPayload)
      .then(respObj => respObj.hotels.hotels[0].rooms[0].rates[0].rateKey)
      .then((rateKey) => {
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
              rateKey,
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
          console.log(resJson);
          expect(resJson.status).toEqual('CONFIRMED');
          done();
        });
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
          email: 'admin@hotello.com',
        },
      }).then((dbBooking) => {
        // console.log(dbBooking);
        expect(dbBooking.bookingid).toEqual(booking.reference);
        done();
      });
    });
  });
});
