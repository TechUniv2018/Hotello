const Server = require('../../src/server');
const Models = require('../../models');

jest.setTimeout(10000);
describe('Test server for POST /usersignup: ', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => {
      console.log('table cleared');
      done();
    });
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  test('Should return statusCode 201: ', (done) => {
    const options = {
      url: 'localhost:8000/userSignUp',
      method: 'POST',
      payload: {
        email: 'kukkal@gmail.com',
        firstName: 'Ajay',
        lastName: 'Singh',
        password: 'P@$$w0rd',
        role: 'publicUser',
        phoneNumber: '7823298390',
      },
    };
    Server.inject(options, (response) => {
      expect(response.statusCode).toBe(201);
      done();
    });
  });

  test('Should return result \'User Signed Up!\': ', (done) => {
    const options = {
      url: 'localhost:8000/userSignUp',
      method: 'POST',
      payload: {
        email: 'lukaku@gmail.com',
        firstName: 'Gajay',
        lastName: 'Singha',
        password: 'P@$$w0rd',
        role: 'publicUser',
        phoneNumber: '7823298390',
      },
    };
    Server.inject(options, (response) => {
      // console.log(response);
      expect(response.result.msg).toBe('User Signed Up!');
      done();
    });
  });

  test('Should return statusCode: 400 for empty firstName field: ', (done) => {
    const options = {
      url: 'localhost:8000/userSignUp',
      method: 'POST',
      payload: {
        email: 'ajay@gmail.com',
        firstName: null,
        lastName: 'Singh',
        password: 'P@$$w0rd',
        role: 'publicUser',
      },
    };
    Server.inject(options, (response) => {
      // console.log(response);
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('should return statusCode: 409 for entering already existing email', (done) => {
    const options = {
      url: 'localhost:8000/userSignUp',
      method: 'POST',
      payload: {
        email: 'lukaku@gmail.com',
        firstName: 'lionel',
        lastName: 'messi',
        password: 'P@$$w0rd',
        role: 'publicUser',
        phoneNumber: '7823298390',
      },
    };
    Server.inject(options, (response) => {
      // console.log(response);
      expect(response.statusCode).toBe(409);
      done();
    });
  });
});
