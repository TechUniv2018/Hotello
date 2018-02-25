const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');

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


  it('Checking for response from the deleteUser route', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, constants.JWT_SECRET);
    const options = {
      method: 'DELETE',
      url: '/deleteUser',
      headers: {
        Authorization: authorization,
      },
      payload: {
        email: 'publicUser@hotello.com',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toBe('deleted');
      done();
    });
  });

  it('Checking if the user has been removed', (done) => {
    const authorization = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      email: 'admin@hotello.com',
    }, constants.JWT_SECRET);
    const options = {
      method: 'DELETE',
      url: '/deleteUser',
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
        expect(user).toBe(null);
        done();
      });
    });
  });
});
