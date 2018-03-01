const Server = require('../../src/server');
const Models = require('../../models');
const crypto = require('crypto');

jest.setTimeout(10000);
describe('Testing for validation of user input', () => {
  beforeAll((done) => {
    setTimeout(() => {
      done();
    }, 3000);
  });
  it('Should return 400 Bad Request for invalid input (length of password)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef@gmail.com',
        password: '123a',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('Should return 400 Bad Request for invalid input (username not an email id)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef',
        password: 'aA$basd1',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('Should return 400 Bad Request for invalid input (invalid characters in password)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef',
        password: 'aA$basd1\'',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});


describe('Testing for user validation with database', () => {
  beforeAll(done => Models.users.create({
    firstName: 'ABC',
    lastName: 'DEF',
    email: 'abcdef@sample.com',
    password: crypto.createHash('md5').update('aA$basd1').digest('hex'),
    role: 'Admin',
    phoneNumber: 9876543210,
  }).then(() => { done(); }));

  afterAll(done => Models.users.destroy({ truncate: true }).then(() => { done(); }));

  it('Should return "Valid credentials" for valid user (user exists in database)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef@sample.com',
        password: 'aA$basd1',
      },
    };
    Server.inject(options, (response) => {
      expect(response.payload).not.toBe(null);
      done();
    });
  });
  it('Should return "User does not exist" for invalid user (user does not exist in database)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef@gmail.com',
        password: 'aA$basd1',
      },
    };
    Server.inject(options, (response) => {
      expect(response.payload).toMatch('User does not exist');
      done();
    });
  });
  it('Should return "Invalid credentials" for invalid password (username exists in database but password does not match)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef@sample.com',
        password: 'aA$basd123',
      },
    };
    Server.inject(options, (response) => {
      expect(response.payload).toMatch('Invalid credentials');
      done();
    });
  });
});

