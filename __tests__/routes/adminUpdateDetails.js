const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');
const updateHandler = require('../../src/controllers/adminUpdateDetails');

const usersArray = [{
  firstName: 'Admin',
  lastName: 'Admin',
  email: 'admin@hotello.com',
  password: 'aA3@zxcy',
  role: 'admin',
  phoneNumber: 9876543210,
},
{
  firstName: 'Myfname',
  lastName: 'Mylname',
  email: 'sampleuser@gmail.com',
  password: 'bA$z0bqQ',
  role: 'user',
  phoneNumber: 999999999,
},
];


describe('Testing the admin update details route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true })
      .then(() => {
        done();
      });
  });
  afterAll((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  beforeEach((done) => {
    Models.users.bulkCreate(usersArray).then(() => {
      done();
    });
  });
  afterEach((done) => {
    Models.users.destroy({ truncate: true }).then(() => done());
  });
  it('Testing for checking of jwt token,should return the decoded token', (done) => {
    const options = {
      method: 'POST',
      url: '/adminUpdateDetails',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, 'RandomSecretString'),
      },
      payload: {
        email: 'sampleuser@gmail.com',
        firstName: 'Editedfname',
        lastName: 'Editedlname',
        phoneNumber: 8796543210,
      },
    };
    server.inject(options, (response) => {
      expect(response.result.email).toMatch('admin@hotello.com');
      done();
    });
  });
  it('Testing for request without email id, should return error 400', (done) => {
    const options = {
      method: 'POST',
      url: '/adminUpdateDetails',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, 'RandomSecretString'),
      },
      payload: {
        firstName: 'Editedfname',
        lastName: 'Editedlname',
        phoneNumber: 8796543210,
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('Testing for request with invalid parameters, should return error 400', (done) => {
    const options = {
      method: 'POST',
      url: '/adminUpdateDetails',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'admin@hotello.com',
        }, 'RandomSecretString'),
      },
      payload: {
        firstName: '123',
        lastName: '456',
        phoneNumber: 87965,
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});

