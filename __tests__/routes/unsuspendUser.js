const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const crypto = require('crypto');

jest.setTimeout(10000);
describe('Testing the suspend user details route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  beforeEach((done) => {
    Models.users.bulkCreate([{
      email: 'admin@hotello.com',
      password: crypto.createHash('md5').update('Hotello@12').digest('hex'),
      role: 'admin',
      suspended: true,
    },
    {
      email: 'publicUser@hotello.com',
      password: crypto.createHash('md5').update('PublicUser@1234').digest('hex'),
      role: 'user',
      suspended: true,
    }]).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });


  it('Checking for response from the suspendUser route', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, constants.JWT_SECRET);
    const options = {
      method: 'PUT',
      url: '/unsuspendUser',
      headers: {
        Authorization: authorization,
      },
      payload: {
        email: 'publicUser@hotello.com',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toBe('unsuspended');
      done();
    });
  });

  it('Checking if the suspend column has been made true for the respective user', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, constants.JWT_SECRET);
    const options = {
      method: 'PUT',
      url: '/unsuspendUser',
      headers: {
        Authorization: authorization,
      },
      payload: {
        email: 'publicUser@hotello.com',
      },
    };
    server.inject(options, () => {
      Models.users.find({
        where: {
          email: options.payload.email,
        },
      }).then((user) => {
        expect(user.suspended).toBe(false);
        done();
      });
    });
  });
});
