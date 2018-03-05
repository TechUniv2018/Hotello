const suspendUserHandler = require('../../src/controllers/suspendUserHandler');
const jwt = require('jsonwebtoken');
const Models = require('../../models');
const constants = require('../../src/constants.json');
const crypto = require('crypto');

jest.setTimeout(10000);
describe('Testing the suspend user handler function', () => {
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
    },
    {
      email: 'publicUser@hotello.com',
      password: crypto.createHash('md5').update('PublicUser@1234').digest('hex'),
      role: 'user',
    }]).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });

  it('Trying to suspend with a non admin account, expected: Not admin response', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'publicUser@hotello.com',
    }, constants.JWT_SECRET);
    const payload = {
      email: 'publicUser@hotello.com',
    };
    const promise = suspendUserHandler(authorization, payload);
    promise.catch((err) => {
      expect(err.message).toBe('Not admin');
      done();
    });
  });
});
