const fetch = require('node-fetch');
const xSigGenerator = require('../helpers/xSignatureGenerator');
const constants = require('../constants.json');

const viewHotelDetailsHandler = (hotelId) => {
  const requestUrl = `https://api.test.hotelbeds.com//hotel-content-api/1.0/hotels/${hotelId}?language=ENG&useSecondaryLanguage=False`;
  const apiKey = constants.API_KEY;
  const xSignature = xSigGenerator();
  const requestConfig = {
    headers: {
      'Api-key': apiKey,
      'X-Signature': xSignature,
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
    },
  };

  return fetch(requestUrl, requestConfig)
    .then(response => response.json())
    .then(respJson => respJson)
    .catch(() => 'Error');
};

module.exports = viewHotelDetailsHandler;
