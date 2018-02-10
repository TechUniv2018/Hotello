const server = require('../src/server');

describe('connecting to server with valid login details', () => {
  it('returns login successful for valid form data', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        username: 'arpita',
        password: 'arpita_jain',
      },
    };
    server.inject(options, (response) => {
      expect(response.result).toBe('login successful');
      done();
    });
  });
  it('returns status code 400 for username< 6characters', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        username: 'arpit',
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
      url: '/login',
      payload: {
        username: 'arpita',
        password: 'arpita',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});
