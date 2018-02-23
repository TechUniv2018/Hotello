const Models = require('../../models');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const server = require('../../src/server');

describe('Test route for GET /viewBookingsByCity: ', () => {
  beforeAll((done) => {
    Models.bookings.destroy({ truncate: true }).then(() => {
      Models.users.destroy({ truncate: true }).then(() => {
        Models.users.bulkCreate([{
          firstName: 'Admin',
          lastName: 'Admin',
          email: 'admin@hotello.com',
          password: 'aA3@zxcy',
          role: 'admin',
          phoneNumber: '9876543210',
        },
        {
          firstName: 'Sample',
          lastName: 'User',
          email: 'sampleuser@gmail.com',
          password: 'bB6$zxcy',
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

  it('Testing for request with no city name, should return error 404', (done) => {
    const options = {
      method: 'GET',
      url: '/viewBookingsByCity',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
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
      url: '/viewBookingsByCity/$1asd',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('Testing for request with valid city name, should return list of booking details', (done) => {
    const options = {
      method: 'GET',
      url: '/viewBookingsByCity/Bangalore',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
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
      expect(response.result).toEqual(expectedArr);
      expect(response.statusCode).not.toBe(500);
      done();
    });
  }, 10000);
});
