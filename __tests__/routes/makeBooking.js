const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const Models = require('../../models');

jest.setTimeout(10000);
describe('Testing the make booking route', () => {
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
      password: 'Hotello@12',
      role: 'admin',
      phoneNumber: 999999999,
    }).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  it('returns the response for booking', (done) => {
    const options = {
      method: 'POST',
      url: '/bookHotel',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, 'RandomSecretString'),
      },
      payload: {
        rooms: [{
          rateKey: '20180315|20180316|W|1|215417|DBT.ST|CG-MERCHANT|RO||1~2~0||N@0060D576732E4672ABFC8FAC656BD2740604',
          paxes: [{
            roomId: '1',
            type: 'AD',
            name: 'First Adult Name',
            surname: 'Surname',
          },
          ],
        }],
      },
    };
    server.inject(options, (response) => {
      console.log(response.result);
      expect(response.result).toEqual();
      done();
    });
  });
});
