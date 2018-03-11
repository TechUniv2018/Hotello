const fetch = require('node-fetch');
const constants = require('../constants.json');

const getBookingStatusHandler = (authorization, sessionId, pnr) => {
  const requestUrl = `https://dev.allmyles.com/v2.0/hotels/${pnr}/status`;
  const apiKey = constants.API_KEY;
  const requestConfig = {
    method: 'get',
    headers: {
      'X-Auth-Token': apiKey,
      Cookie: sessionId,
      'Content-Type': 'application/json',
    },
  };

  return fetch(requestUrl, requestConfig)
    .then(response => response.text())
    .then((respJson) => { console.log(respJson); return respJson; })
    .catch(() => 'Error');
};

module.exports = getBookingStatusHandler;
