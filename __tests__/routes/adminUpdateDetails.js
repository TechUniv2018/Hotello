const server = require('../../src/server');
const Models = require('../../models');
const jwt = require('jsonwebtoken');
// const updateHandler = require('../../src/controllers/adminUpdateDetails');

const usersArray = [{
  firstName: 'Admin',
  lastName: 'Admin',
  email: 'admin@hotello.com',
  password: 'aA3@zxcy',
  role: 'admin',
  phoneNumber: '9876543210',
},
{
  firstName: 'Myfname',
  lastName: 'Mylname',
  email: 'sampleuser@gmail.com',
  password: 'bA$z0bqQ',
  role: 'user',
  phoneNumber: '999999999',
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
        email: 'sampleuser@gmail.com',
        firstName: '123',
        lastName: '456',
        phoneNumber: '87965',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('Testing for request with non-existent admin email, should return error "No such admin found"', (done) => {
    const options = {
      method: 'POST',
      url: '/adminUpdateDetails',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'notadmin@hotello.com',
        }, 'RandomSecretString'),
      },
      payload: {
        email: 'sampleuser@gmail.com',
        firstName: 'Editedfname',
        lastName: 'Editedlname',
        phoneNumber: '8796543210',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('No such admin found');
      done();
    });
  });
  it('Testing for request with public user email, should return error "No such admin found"', (done) => {
    const options = {
      method: 'POST',
      url: '/adminUpdateDetails',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, 'RandomSecretString'),
      },
      payload: {
        email: 'sampleuser@gmail.com',
        firstName: 'Editedfname',
        lastName: 'Editedlname',
        phoneNumber: '8796543210',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('No such admin found');
      done();
    });
  });
  it('Testing for request with admin email and non-existent user email, should return error "User not found"', (done) => {
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
        email: 'sampleuser2@gmail.com',
        firstName: 'Editedfname',
        lastName: 'Editedlname',
        phoneNumber: '8796543210',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('User not found');
      done();
    });
  });
  it('Testing for request with admin email and valid user email, should return target email and updated info', (done) => {
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
        phoneNumber: '8796543210',
      },
    };
    server.inject(options, (response) => {
      const expectedObj = { email: 'sampleuser@gmail.com', firstName: 'Editedfname', lastName: 'Editedlname' };
      const recvdObj = { email: response.result.email, firstName: response.result.firstName, lastName: response.result.lastName };
      expect(recvdObj).toEqual(expectedObj);
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
        email: 'sampleuser@gmail.com',
        firstName: '123',
        lastName: '456',
        phoneNumber: '87965',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  it('Testing for request with non-existent admin email, should return error "No such admin found"', (done) => {
    const options = {
      method: 'POST',
      url: '/adminUpdateDetails',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'notadmin@hotello.com',
        }, 'RandomSecretString'),
      },
      payload: {
        email: 'sampleuser@gmail.com',
        firstName: 'Editedfname',
        lastName: 'Editedlname',
        phoneNumber: '8796543210',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('No such admin found');
      done();
    });
  });
  it('Testing for request with public user email, should return error "No such admin found"', (done) => {
    const options = {
      method: 'POST',
      url: '/adminUpdateDetails',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, 'RandomSecretString'),
      },
      payload: {
        email: 'sampleuser@gmail.com',
        firstName: 'Editedfname',
        lastName: 'Editedlname',
        phoneNumber: '8796543210',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('No such admin found');
      done();
    });
  });
  it('Testing for request with admin email, should return error "Admin found"', (done) => {
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
        phoneNumber: '8796543210',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('Admin found');
      done();
    });
  });
});
