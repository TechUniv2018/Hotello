const Server = require('../../src/server');
const Models = require('../../models');
const JWT = require('jsonwebtoken');

describe('Test server for GET /adminViewBookings: ', () => {
  beforeAll((done) => {
    Models.users.create({
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@hotello.com',
      password: 'aA3@zxcy',
      role: 'admin',
      phoneNumber: '9876543210',
    }).then(() => {
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
        },
        {
          bookingid: 'ref3456',
          email: 'ajay2singh@gmail.com',
          bookingdate: '2018-02-15',
          amount: 1720.00,
          hotelname: 'Royal Orchid',
          checkin: '2018-02-20',
          checkout: '2018-02-25',
          numofguests: 2,
          numofrooms: 1,
        }]).then(() => done());
      });
    });
  });
  afterAll((done) => {
    Models.bookings.destroy({ truncate: true }).then(() => {
      Models.users.destroy({ truncate: true }).then(() => done());
    });
  });

  test('Should return statusCode 200: ', (done) => {
    const options = {
      url: '/adminViewBookings',
      method: 'GET',
      headers: {
        Authorization: JWT.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, 'RandomSecretString'),
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Should return all the bookings: ', (done) => {
    const options = {
      url: '/adminViewBookings',
      method: 'GET',
      headers: {
        Authorization: JWT.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, 'RandomSecretString'),
      },
    };

    const allBookings =
      [{
        amount: 1720,
        bookingdate: '2018-02-15',
        bookingid: 'ref3456',
        checkin: '2018-02-20',
        checkout: '2018-02-25',
        email: 'ajaysingh@gmail.com',
        hotelname: 'Royal Orchid',
        numofguests: 2,
        numofrooms: 1,
      },
      {
        amount: 1720,
        bookingdate: '2018-02-15',
        bookingid: 'ref3456',
        checkin: '2018-02-20',
        checkout: '2018-02-25',
        email: 'ajay2singh@gmail.com',
        hotelname: 'Royal Orchid',
        numofguests: 2,
        numofrooms: 1,
      }];
    // const testObj = { allBookings };
    Server.inject(options, (response) => {
      // console.log(response.result);
      expect(response.result).toEqual(allBookings);
      done();
    });
  });
});
