const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');

jest.setTimeout(10000);
describe('Testing the update user details route', () => {
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


  it('gets user details for the given email-unit function', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, 'RandomSecretString');
    const options = {
      method: 'PUT',
      url: '/suspendUser',
      headers: {
        Authorization: authorization,
      },
      payload: {
        email: 'publicUser@hotello.com',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toBe('working on it');
      done();
    });
  });
});
