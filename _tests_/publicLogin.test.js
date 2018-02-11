const Server = require('../src/server');


describe('Testing for validation of user input', () => {
  it('Should return "Login OK" for valid string input', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef',
        password: 'abcdefghi',
      },
    };
    Server.inject(options, (response) => {
      expect(response.payload).toMatch('Login OK');
      done();
    });
  });
  it('Should return "Login OK" for valid alphanumeric input', (done) => {
    const options = {
      method: 'POST',
      url: '/publicLogin',
      payload: {
        username: 'abcdef123',
        password: '123abc456',
      },
    };
    Server.inject(options, (response) => {
      expect(response.payload).toMatch('Login OK');
      done();
    });
  });
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
