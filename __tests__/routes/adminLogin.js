const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

jest.setTimeout(10000);
describe('Testing the validation part', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  beforeEach((done) => {
    Models.users.create({
      email: 'ad2min@hotello.com',
      password: 'Hotello@12',
    }).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  it('returns status code 400 for username not a valid email', (done) => {
    const options = {
      method: 'POST',
      url: '/adminLogin',
      payload: {
        email: 'arpitajain',
        password: 'Arpita@12345',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('returns status code 400 for password not containing a capital letter', (done) => {
    const options = {
      method: 'POST',
      url: '/adminLogin',
      payload: {
        email: 'arpitagjain0811@gmail.com',
        password: 'arpita@123',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('returns status code 400 for password not containing a special character', (done) => {
    const options = {
      method: 'POST',
      url: '/adminLogin',
      payload: {
        email: 'arpitajagin0811@gmail.com',
        password: 'Arpita123',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('returns status code 400 for password not containing a number', (done) => {
    const options = {
      method: 'POST',
      url: '/adminLogin',
      payload: {
        email: 'arpitajwain0811@gmail.com',
        password: 'Arpita@jain',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});


describe('Testing if database calls are made', () => {
  beforeAll((done) => {
    Models.users.create({
      email: 'ad2min@hotello.com',
      password: 'Hotello@12',
    }).then(() => {
      done();
    });
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true });
    done();
  });
  it('returns wrong username for invalid form data', (done) => {
    const options = {
      method: 'POST',
      url: '/adminLogin',
      payload: {
        email: 'abcd@gmail.com',
        password: 'Aashdhdf@1223',
      },
    };
    server.inject(options, (response) => {
      expect(response.result).toBe('Wrong email');
      done();
    });
  });
  it('returns wrong password for invalid form data', (done) => {
    const options = {
      method: 'POST',
      url: '/adminLogin',
      payload: {
        email: 'ad2min@hotello.com',
        password: 'ABcd@123',
      },
    };
    server.inject(options, (response) => {
      expect(response.result).toBe('Wrong password');
      done();
    });
  });
});

describe('Testing if login route is returning a jwt token', () => {
  beforeAll((done) => {
    Models.users.create({
      email: 'admin1@hotello.com',
      password: crypto.createHash('md5').update('Hotello@12').digest('hex'),
      role: 'admin',
    }).then(() => {
      done();
    });
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true });
    done();
  });
  it('Passing correct login credentials, Expected output: a JWT token', (done) => {
    const options = {
      method: 'POST',
      url: '/adminLogin',
      payload: {
        email: 'admin1@hotello.com',
        password: 'Hotello@12',
      },
    };
    server.inject(options, (response) => {
      const JWT = response.payload;
      const tokenPayload = jwt.decode(JWT, { complete: true }).payload;
      expect(tokenPayload).toHaveProperty('iat');
      expect(tokenPayload).toHaveProperty('exp');
      expect(tokenPayload).toHaveProperty('email');
      done();
    });
  });
});
