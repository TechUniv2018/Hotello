const fetch = require('node-fetch');
const constants = require('../constants.json');

const adminCancelBookingHandler = (authorization, pnr) => {
  const requestUrl = `https://dev.allmyles.com/v2.0/books/${pnr}`;
  const apiKey = constants.API_KEY;
  const requestConfig = {
    method: 'get',
    headers: {
      'X-Auth-Token': apiKey,
      Cookie: constants.TEST_COOKIE,
      'Content-Type': 'application/json',
    },
  };

  return fetch(requestUrl, requestConfig)
    .then(response => response.text())
    .then((respJson) => { console.log(respJson); return respJson; })
    .catch(() => 'Error');
};

module.exports = adminCancelBookingHandler;
