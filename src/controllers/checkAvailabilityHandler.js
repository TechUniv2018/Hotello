const fetch = require('node-fetch');
const constants = require('../constants.json');
const cityCodes = require('../helpers/cityCodes');

const checkAvailabilityHandler = (authorization, payload) => {
  const apiUrl = 'https://dev.allmyles.com/v2.0/hotels/';

  const apiKey = constants.API_KEY;
  const cityCode = cityCodes[payload.cityName];

  if (cityCode === undefined) {
    return Promise.resolve('City not found');
  }
  const requestBody = {
    cityCode,
    rooms: payload.rooms,
    arrivalDate: payload.checkIn,
    leaveDate: payload.checkOut,
    nationality: payload.nationality,
  };


  const requestConfig = {
    method: 'post',
    headers: {
      'X-Auth-Token': apiKey,
      Cookie: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  };


  return fetch(apiUrl, requestConfig)
    .then(response =>
      response.text())
    .then((responseJSON) => { console.log(responseJSON, 'after'); return responseJSON; })
    .catch(() => 'Error');
};

module.exports = checkAvailabilityHandler;
