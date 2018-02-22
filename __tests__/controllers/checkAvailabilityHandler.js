const checkAvailabilityHandler = require('../../src/controllers/checkAvailabilityHandler');

const testPayload = {
  checkIn: '2018-03-12',
  checkOut: '2018-03-15',
  rooms: 1,
  adults: 1,
  children: 1,
  childrenAges: [10],
  hotels: [1067,
    182125,
    187939,
    212167,
    215417],
};
describe('Testing the search hotels by city route', () => {
  beforeAll((done) => {
    done();
  });
  afterAll((done) => {
    done();
  });
  it('Testing the checkAvailability handler function', (done) => {
    checkAvailabilityHandler(testPayload).then((response) => {
      expect(response).not.toBe('Error');
      done();
    });
  }, 10000);
});
