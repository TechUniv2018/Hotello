const server = require('../../src/server');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants.json');
const fetch = require('node-fetch');
const mockResponses = require('../../src/mockResponses');

const testPayload =
    {
      paymentId: '926915vdqwd712',
      basket: [
        '2f41b259-7f30-4b4c-84be-41142e278394',
      ],
      currency: 'USD',
      amount: 364.3213,
    };
const expectedResponse = mockResponses.makePaymentResponse;
fetch.mockResponse(expectedResponse);


describe('Testing makePayment route ', () => {
  beforeAll((done) => {
    setTimeout(() => { done(); }, 3000);
  });
  afterAll((done) => {
    done();
  });

  it('Testing for request with invalid parameters should return error 400', (done) => {
    const options = {
      method: 'POST',
      url: '/makePayment',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
      payload: {
        paymentId: '926915vdqwd712',
        basket:
          'e264f824-052d-4180-9af7-a82c5b725686',
        finalPrice: {
          currency: 'USD',
          amount: 68.4847,
        },
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });


  it('Testing for request with proper parameters, checking if response is 204 No content', (done) => {
    const options = {
      method: 'POST',
      url: '/makePayment',
      headers: {
        Authorization: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          email: 'sampleuser@gmail.com',
        }, constants.JWT_SECRET),
      },
      payload: testPayload,
    };
    server.inject(options, (response) => {
      console.log(response.statusCode);
      expect(response.payload).toMatch('Successful');
      done();
    });
  });
});
