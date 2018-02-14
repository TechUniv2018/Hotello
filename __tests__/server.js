const server = require('../src/server');
const Models = require('../models');

describe('Testing the validation part', () => {
  beforeAll((done) => {
    Models.users.create({
      username: 'arpitanew',
      password: 'arpita_jain',
    }).then((err) => {
      console.log('ERROR IS', err);
      done();
    });
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true });
    done();
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


describe('Testing if database calls are made', () => {
  beforeAll((done) => {
    Models.users.create({
      username: 'arpitanew',
      password: 'arpita_jain',
    }).then((err) => {
      console.log('ERROR IS', err);
      done();
    });
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true });
    done();
  });
  it('returns wrong username for invalid form data', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        username: 'aakash',
        password: 'aakash12',
      },
    };
    server.inject(options, (response) => {
      expect(response.result).toBe('Wrong username');
      done();
    });
  });
  it('returns wrong password for invalid form data', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        username: 'arpitanew',
        password: 'aakash12',
      },
    };
    server.inject(options, (response) => {
      expect(response.result).toBe('Wrong password');
      done();
    });
  });
});

// describe('Testing if the login route for jwt', () => {
//   // beforeAll((done) => {
//   //   Models.users.create({
//   //     username: 'aakash',
//   //     password: 'aakash12',
//   //   }).then(done());
//   // });
//   // afterAll((done) => {
//   //   Models.users.destroy({ truncate: true });
//   //   done();
//   // });
//   it('returns login successful for valid form data', (done) => {
//     const options = {
//       method: 'POST',
//       url: '/login',
//       payload: {
//         username: 'arpita',
//         password: 'arpita_jain',
//       },
//     };
//     server.inject(options, (response) => {
//       expect(response.result).toBe('Invalid credentials');
//       done();
//     });
//   });
// });
