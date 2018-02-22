const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const Models = require('../../models');
const constants = require('../../src/constants.json');
const saveBooking = require('../../src/controllers/saveBooking');

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
    Models.bookings.destroy({ truncate: true }).then(() => done());
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
          rateKey: '20180315|20180316|W|1|182125|DBT.ST|CG-TODOS1|BB||1~2~0||N@3343EA9AB56541079DA3CECE914DA1831801',
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
          email: 'admin@hotello.com',
        },
      }).then((dbBooking) => {
        expect(dbBooking.bookingid).toEqual(booking.reference);
        done();
      });
    });
  });
});
