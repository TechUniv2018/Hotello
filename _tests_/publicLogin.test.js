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
});
