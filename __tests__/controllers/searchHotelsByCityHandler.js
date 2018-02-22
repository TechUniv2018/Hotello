const searchHotelsByCityHandler = require('../../src/controllers/searchHotelsByCityHandler');

describe('Testing the search hotels by city route', () => {
  beforeAll((done) => {
    done();
  });
  afterAll((done) => {
    done();
  });
  it('Testing the searchHotelsByCity handler function', (done) => {
    searchHotelsByCityHandler('authtoken', 'Bangalore').then((response) => {
      expect(response).not.toBe('Error');
      done();
    });
  }, 10000);
});
