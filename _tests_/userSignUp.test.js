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
});
