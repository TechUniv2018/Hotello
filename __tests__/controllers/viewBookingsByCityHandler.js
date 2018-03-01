const Models = require('../../models');
const JWT = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const viewBookingsByCityHandler = require('../../src/controllers/viewBookingsByCityHandler');
const crypto = require('crypto');

describe('Test handler for GET /viewBookingsByCity: ', () => {
  beforeAll((done) => {
    Models.bookings.destroy({ truncate: true }).then(() => {
      Models.users.destroy({ truncate: true }).then(() => {
        Models.users.bulkCreate([{
          firstName: 'Admin',
          lastName: 'Admin',
          email: 'admin@hotello.com',
          password: crypto.createHash('md5').update('aA3@zxcy').digest('hex'),
          role: 'admin',
          phoneNumber: '9876543210',
        },
        {
          firstName: 'Sample',
          lastName: 'User',
          email: 'sampleuser@gmail.com',
          password: crypto.createHash('md5').update('bB6$zxcy').digest('hex'),
          role: 'user',
          phoneNumber: '9874065321',
        }]).then(() => {
          Models.bookings.destroy({ truncate: true }).then(() => {
            Models.bookings.bulkCreate([{
              bookingid: 'ref3456',
              email: 'ajaysingh@gmail.com',
              bookingdate: '2018-02-15',
              amount: 1720.00,
              hotelname: 'Royal Orchid',
              checkin: '2018-02-20',
              checkout: '2018-02-25',
              numofguests: 2,
              numofrooms: 1,
              city: 'Bangalore',
            },
            {
              bookingid: 'ref3457',
              email: 'ajay2singh@gmail.com',
              bookingdate: '2018-02-15',
              amount: 1720.00,
              hotelname: 'Royal Orchid',
              checkin: '2018-02-20',
              checkout: '2018-02-25',
              numofguests: 2,
              numofrooms: 1,
              city: 'Bangalore',
            },
            {
              bookingid: 'ref3458',
              email: 'ajay3singh@gmail.com',
              bookingdate: '2018-02-15',
              amount: 1720.00,
              hotelname: 'Royal Orchid',
              checkin: '2018-02-20',
              checkout: '2018-02-25',
              numofguests: 2,
              numofrooms: 1,
              city: 'Mumbai',
            }]).then(() => done());
          });
        });
      });
    });
  });
  afterAll((done) => {
    Models.bookings.destroy({ truncate: true }).then(() => {
      Models.users.destroy({ truncate: true }).then(() => done());
    });
  });

  it('Testing for city with multiple bookings, should return 2 rows', (done) => {
    const token = JWT.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, constants.JWT_SECRET);

    viewBookingsByCityHandler(token, 'Bangalore').then((response) => {
      const expectedArr = [{
        amount: 1720,
        bookingdate: '2018-02-15',
        bookingid: 'ref3456',
        checkin: '2018-02-20',
        checkout: '2018-02-25',
        email: 'ajaysingh@gmail.com',
        city: 'Bangalore',
        hotelname: 'Royal Orchid',
        numofguests: 2,
        numofrooms: 1,
      },
      {
        amount: 1720,
        bookingdate: '2018-02-15',
        bookingid: 'ref3457',
        checkin: '2018-02-20',
        checkout: '2018-02-25',
        email: 'ajay2singh@gmail.com',
        city: 'Bangalore',
        hotelname: 'Royal Orchid',
        numofguests: 2,
        numofrooms: 1,
      }];
      expect(response).toEqual(expectedArr);
      done();
    });
  });
  it('Testing for city with single booking, should return 1 row', (done) => {
    const token = JWT.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, constants.JWT_SECRET);

    viewBookingsByCityHandler(token, 'Mumbai').then((response) => {
      const expectedArr = [{
        amount: 1720, bookingdate: '2018-02-15', bookingid: 'ref3458', checkin: '2018-02-20', checkout: '2018-02-25', city: 'Mumbai', email: 'ajay3singh@gmail.com', hotelname: 'Royal Orchid', numofguests: 2, numofrooms: 1,
      }];
      expect(response).toEqual(expectedArr);
      done();
    });
  });
  it('Testing for city with no bookings, should return 0 rows', (done) => {
    const token = JWT.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, constants.JWT_SECRET);

    viewBookingsByCityHandler(token, 'Chennai').then((response) => {
      const expectedArr = [];
      expect(response).toEqual(expectedArr);
      done();
    });
  });
  it('Testing for request from public user, should Unauthorized', (done) => {
    const token = JWT.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'sampleuser@gmail.com',
    }, constants.JWT_SECRET);

    viewBookingsByCityHandler(token, 'Chennai').then((response) => {
      expect(response).toMatch('Unauthorized');
      done();
    });
  });
  it('Testing for request from unregistered email id, should Unauthorized', (done) => {
    const token = JWT.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'unknown@gmail.com',
    }, constants.JWT_SECRET);

    viewBookingsByCityHandler(token, 'Chennai').then((response) => {
      expect(response).toMatch('Unauthorized');
      done();
    });
  });
});
