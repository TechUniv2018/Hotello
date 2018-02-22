const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const Models = require('../../models');

// jest.setTimeout(10000);
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
          rateKey: '20180315|20180316|W|1|1550|DBT.SU|CG-TODOS1|RO||1~2~0||N@437B57020A444F319CCECC97CF9267451326',
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
      const resJson = JSON.parse(response.payload);
      console.log(resJson);
      expect(resJson.status).toEqual('CONFIRMED');
      done();
    });
  });
});
