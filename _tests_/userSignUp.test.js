const Server = require('../src/server');

describe('Test server for POST /usersignup: ', () => {
  test('Should return statusCode 201: ', (done) => {
    const options = {
      url: 'localhost:8000/usersignup',
      method: 'POST',
      payload: {
        email: 'ajay@gmail.com',
        firstName: 'Ajay',
        lastName: 'Singh',
        username: 'ajay9876',
        password: 'p@$$w0rd',
        confirmPassword: 'p@$$w0rd',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(201);
      done();
    });
  });

  test('Should return result \'User Signed Up!\': ', (done) => {
    const options = {
      url: 'localhost:8000/usersignup',
      method: 'POST',
      payload: {
        email: 'ajay@gmail.com',
        firstName: 'Ajay',
        lastName: 'Singh',
        username: 'ajay9876',
        password: 'p@$$w0rd',
        confirmPassword: 'p@$$w0rd',
      },
    };
    Server.inject(options, (response) => {
      expect(response.result).toBe('User Signed Up!');
      done();
    });
  });

  test('Should return statusCode: 400 for empty firstName field: ', (done) => {
    const options = {
      url: 'localhost:8000/usersignup',
      method: 'POST',
      payload: {
        email: 'ajay@gmail.com',
        firstName: null,
        lastName: 'Singh',
        username: 'ajay9876',
        password: 'p@$$w0rd',
        confirmPassword: 'p@$$w0rd',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Should return statusCode: 400 for unmatched confirm password: ', (done) => {
    const options = {
      url: 'localhost:8000/usersignup',
      method: 'POST',
      payload: {
        email: 'ajay@gmail.com',
        firstName: 'Ajay',
        lastName: 'Singh',
        username: 'ajay9876',
        password: 'p@$$w0rd',
        confirmPassword: 'p@$$w0',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});
