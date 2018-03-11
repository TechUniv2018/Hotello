const fetch = require('node-fetch');
const cityCodes = require('../helpers/cityCodes');
const xSigGenerator = require('../helpers/xSignatureGenerator');
const constants = require('../constants.json');

const searchHotelsByCityHandler = (cityName) => {
  const requestCityCode = cityCodes[cityName];
  const apiUrl = 'https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=all&language=ENG&from=1&to=100&useSecondaryLanguage=false&destinationCode=';
  const requestUrl = apiUrl + requestCityCode;
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

module.exports = searchHotelsByCityHandler;
