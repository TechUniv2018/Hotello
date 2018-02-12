const Server = require('../src/server');
const Models = require('../models');


describe('Testing for validation of user input', () => {
  it('Should return 400 Bad Request for invalid input (length of username)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abc',
        password: '123abc456',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('Should return 400 Bad Request for invalid input (length of password)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef',
        password: '123a',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('Should return 400 Bad Request for invalid input (invalid characters in username)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef$',
        password: '123a',
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
        password: '123ab34$',
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
    username: 'abcdef',
    firstname: 'ABC',
    lastname: 'DEF',
    password: '123abcdef',
    mobile: 9876543210,
    email_id: 'abcdef@sample.com',
    address: 'Sample address text',
    role: 'Admin',
    dob: '1997-08-09',
  }));

  afterAll(() => Models.users.destroy({ truncate: true }));

  it('Should return "Valid credentials" for valid user (user exists in database)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef',
        password: '123abcdef',
      },
    };
    Server.inject(options, (response) => {
      expect(response.payload).toMatch('Valid credentials');
      done();
    });
  });
  it('Should return "User does not exist" for invalid user (user does not exist in database)', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'pqrstuv',
        password: '123pqrstuv',
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
        username: 'abcdef',
        password: '123pqrstuv',
      },
    };
    Server.inject(options, (response) => {
      expect(response.payload).toMatch('Invalid credentials');
      done();
    });
  });
});

