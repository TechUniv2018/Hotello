const Server = require('../../src/server');
const Models = require('../../models');


describe('Testing for validation of user input', () => {
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
  beforeAll(() => Models.users.create({
    firstName: 'ABC',
    lastName: 'DEF',
    email: 'abcdef@sample.com',
    password: 'aA$basd1',
    role: 'Admin',
    phoneNumber: 9876543210,
  }));

  afterAll(() => Models.users.destroy({ truncate: true }));

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

