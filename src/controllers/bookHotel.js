const fetch = require('node-fetch');
const xSigGenerator = require('../helpers/xSignatureGenerator');
const getUserDetails = require('../helpers/getUserName');
const constants = require('../constants.json');

// const rp = require('request-promise');

const bookHotelHandler = (authorization, requestObj) => {
  const promise = new Promise((resolve) => {
    const userPromise = getUserDetails(authorization);
    userPromise.then((userObj) => {
      const bookingBody = {
        holder: {
          name: userObj.firstName,
          surname: userObj.lastName,
        },
        rooms: requestObj.rooms,
        clientReference: userObj.firstName,
        remark: '',
      };
      const bookingUrl = 'https://api.test.hotelbeds.com/hotel-api/1.0/bookings';
      const apiKey = constants.API_KEY;
      const xSignature = xSigGenerator();
      const requestConfig = {
        method: 'POST',
        body: JSON.stringify(bookingBody),
        headers: {
          'content-type': 'application/json',
          'Api-key': apiKey,
          'X-Signature': xSignature,
          Accept: 'application/json',
          'Accept-Encoding': 'gzip',
        },
      };
      fetch(bookingUrl, requestConfig)
        .then(response => response.json())
        .then((respJson) => {
          resolve(respJson);
        })
        .catch(e => resolve(`error:${e}`));
    });
  });
  return promise;
};
module.exports = bookHotelHandler;
