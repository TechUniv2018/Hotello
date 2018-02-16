const server = require('../src/server');
const Models = require('../models');
const jwt = require('jsonwebtoken');

describe('Testing the validation part', () => {
  beforeEach((done) => {
    Models.users.create({
      email: 'admin@hotello.com',
      password: 'Hotello@12',
    }).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true });
    done();
  });
  it('returns status code 400 for username< 6characters', (done) => {
    const options = {
      method: 'POST',
      url: '/adminLogin',
      payload: {
        email: 'arpit',
        password: 'arpita_jain',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('returns status code 400 for password< 8characters', (done) => {
    const options = {
      method: 'POST',
      url: '/adminLogin',
      payload: {
        email: 'arpita',
        password: 'arpita',
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
      email: 'admin@hotello.com',
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
        email: 'admin@hotello.com',
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
      email: 'admin@hotello.com',
      password: 'Hotello@12',
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
        email: 'admin@hotello.com',
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
