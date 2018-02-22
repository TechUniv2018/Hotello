const fetch = require('node-fetch');
const xSigGenerator = require('../helpers/xSignatureGenerator');
const constants = require('../constants.json');

const searchHotelsByCityHandler = (payload) => {
  const apiUrl = 'https://api.test.hotelbeds.com/hotel-api/1.0/hotels';
  const requestUrl = apiUrl;
  const apiKey = constants.API_KEY;
  const xSignature = xSigGenerator();
  const requestPaxes = [];
  if (payload.childrenAges) {
    payload.childrenAges.forEach((element) => {
      const currentPax = { type: 'CH', age: element };
      requestPaxes.push(currentPax);
    });
  }
  const requestBody = {
    stay: {
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
    },
    occupancies: [{
      rooms: payload.rooms,
      adults: payload.adults,
      children: payload.children,
      paxes: requestPaxes,
    },
    ],
    hotels: {
      hotel: payload.hotels,
    },
  };


  const requestConfig = {
    method: 'post',
    headers: {
      'Api-key': apiKey,
      'X-Signature': xSignature,
      Accept: 'application/json',
      'Accept-Encoding': 'gzip',
      'content-type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };

  return fetch(requestUrl, requestConfig)
    .then(response => response.json())
    .then(respJson => respJson)
    .catch(() => 'Error');
};

module.exports = searchHotelsByCityHandler;
