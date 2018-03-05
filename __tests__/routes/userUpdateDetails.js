const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');
const updateHandler = require('../../src/controllers/userUpdateDetails');
const constants = require('../../src/constants.json');
const crypto = require('crypto');
// jest.setTimeout(10000);
describe('Testing the update user details route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  beforeEach((done) => {
    Models.users.create({
      firstName: 'Nidhi',
      lastName: 'Seth',
      email: 'admin@hotello.com',
      password: crypto.createHash('md5').update('Hotello@12').digest('hex'),
      role: 'admin',
      phoneNumber: 999999999,
    }).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  it('returns user details for the update form', (done) => {
    const options = {
      method: 'GET',
      url: '/userUpdateDetails',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, constants.JWT_SECRET),
      },
    };
    server.inject(options, (response) => {
      expect(response.result).toEqual({
        firstName: 'Nidhi',
        lastName: 'Seth',
        email: 'admin@hotello.com',
        phoneNumber: '999999999',
      });
      done();
    });
  });

  it('gets user details for the given email-unit function', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, constants.JWT_SECRET);
    const updateDetailsPromise = updateHandler.updateHandlerForGet(authorization);
    updateDetailsPromise.then((userDetails) => {
      expect(userDetails).toEqual({
        firstName: 'Nidhi',
        lastName: 'Seth',
        email: 'admin@hotello.com',
        phoneNumber: '999999999',
      });
      done();
    });
  });
  it('updates details for the given user-unit function', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, constants.JWT_SECRET);
    const payload = {
      firstName: 'Nidhi',
      lastName: 'Seth',
      phoneNumber: '888888888',
    };
    const promise = updateHandler.updateHandlerForPut(authorization, payload);
    promise.then(() => {
      Models.users.find({
        where: {
          email: 'admin@hotello.com',
        },
      }).then((user) => {
        const userDetails = {
          firstName: user.dataValues.firstName,
          lastName: user.dataValues.lastName,
          phoneNumber: user.dataValues.phoneNumber,
        };
        expect(userDetails).toEqual({
          firstName: 'Nidhi',
          lastName: 'Seth',
          phoneNumber: '888888888',
        });
        done();
      });
    });
  });
});
