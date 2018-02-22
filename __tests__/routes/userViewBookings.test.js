const JWT = require('jsonwebtoken');

const Server = require('../../src/server');
const Models = require('../../models');

describe('Test server for GET /adminViewBookings: ', () => {
  beforeAll((done) => {
    Models.users.create({
      firstName: 'User',
      lastName: 'User',
      email: 'ajaysingh@gmail.com',
      password: 'aA3@zxcy',
      role: 'user',
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
          city: 'Bangalore',
        },
        {
          bookingid: 'ref3456',
          email: 'alexander@gmail.com',
          bookingdate: '2018-05-15',
          amount: 2120.00,
          hotelname: 'Grand Orchid',
          checkin: '2018-02-20',
          checkout: '2018-02-25',
          numofguests: 1,
          numofrooms: 1,
          city: 'Bangalore',
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
      url: '/userViewBookings',
      method: 'GET',
      headers: {
        Authorization: JWT.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'ajaysingh@gmail.com',
        }, 'RandomSecretString'),
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

