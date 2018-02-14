const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');

describe('Testing the logout route', () => {
  it('Checking if the logout route exists', (done) => {
    const options = {
      method: 'POST',
      url: '/logout',
      payload: {
        username: 'arpit',
        password: 'arpita_jain',
      },
      headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTg2MzcxNzUsIm5hbWUiOiJhYWthc2giLCJpYXQiOjE1MTg2MzM1NzV9.u6pBxvGugExbkZk53QJV51uTbHIdkcADZDuHOVSnLgI',
      },
    };
    server.inject(options, (response) => {
      expect(response).not.toBe(null);
      done();
    });
  });
});
