const deleteUserHandler = require('../../src/controllers/deleteUserHandler');
const jwt = require('jsonwebtoken');
const Models = require('../../models');

jest.setTimeout(10000);
describe('Testing the delete user handler function', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  beforeEach((done) => {
    Models.users.bulkCreate([{
      email: 'admin@hotello.com',
      password: 'Hotello@12',
      role: 'admin',
    },
    {
      email: 'publicUser@hotello.com',
      password: 'PublicUser@1234',
      role: 'user',
    }]).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });

  it('Trying to delete with a non admin account, expected: Not admin response', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'publicUser@hotello.com',
    }, 'RandomSecretString');
    const payload = {
      email: 'publicUser@hotello.com',
    };
    const promise = deleteUserHandler(authorization, payload);
    promise.catch((err) => {
      expect(err.message).toBe('Not admin');
      done();
    });
  });
});
